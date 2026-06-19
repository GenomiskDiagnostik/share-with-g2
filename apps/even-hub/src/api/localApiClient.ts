export const DEFAULT_API_BASE_URL = 'http://localhost:8765'
export const FALLBACK_API_BASE_URL = 'http://127.0.0.1:8765'
export const DEFAULT_WEBSOCKET_URL = 'ws://localhost:8765/even-hub-ws'
export const FALLBACK_WEBSOCKET_URL = 'ws://127.0.0.1:8765/even-hub-ws'

export type HealthResponse = {
  ok: true
  version: string
}

export type SharedItem = {
  id: string
  type: 'text' | 'url'
  title?: string
  text: string
  sourceApp?: string
  createdAt: number
  read: boolean
}

export type ScreenSnapshot = {
  id: string
  createdAt: number
  width: number
  height: number
  mimeType: 'image/png'
  imageBase64: string
}

type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>

export type WebSocketFactory = (url: string) => WebSocket

type WebSocketResponse = {
  id: number
  status: number
  body: string
}

export class LocalApiClient {
  private activeBaseUrl: string | undefined
  private activeWebSocketUrl: string | undefined

  constructor(
    private readonly baseUrl = DEFAULT_API_BASE_URL,
    private readonly fetcher: Fetcher = fetch,
    private readonly timeoutMs = 3_000,
    private readonly accessKey?: string,
    private readonly fallbackBaseUrls: readonly string[] =
      baseUrl === DEFAULT_API_BASE_URL ? [FALLBACK_API_BASE_URL] : [],
    private readonly webSocketFactory: WebSocketFactory | undefined =
      typeof WebSocket === 'undefined' ? undefined : url => new WebSocket(url),
    private readonly webSocketUrls: readonly string[] =
      baseUrl === DEFAULT_API_BASE_URL
        ? [DEFAULT_WEBSOCKET_URL, FALLBACK_WEBSOCKET_URL]
        : [],
  ) {}

  async health(): Promise<HealthResponse> {
    return parseHealth(await this.request('GET', '/health', false))
  }

  async items(): Promise<SharedItem[]> {
    const value: unknown = await this.request('GET', '/items', true)
    if (!Array.isArray(value)) throw new InvalidApiResponseError()
    return value.map(parseSharedItem)
  }

  async deleteItem(id: string): Promise<void> {
    await this.request('DELETE', `/items/${encodeURIComponent(id)}`, true)
  }

  async clearItems(): Promise<void> {
    await this.request('DELETE', '/items', true)
  }

  async updateRead(id: string, read: boolean): Promise<SharedItem> {
    return parseSharedItem(await this.request(
      'PATCH',
      `/items/${encodeURIComponent(id)}`,
      true,
      { read },
    ))
  }

  async screenSnapshot(): Promise<ScreenSnapshot> {
    return parseScreenSnapshot(
      await this.request('GET', '/screen-snapshot', true),
    )
  }

  private async request(
    method: 'GET' | 'PATCH' | 'DELETE',
    path: string,
    authenticated: boolean,
    body?: unknown,
  ): Promise<unknown> {
    const webSocketCandidates = Array.from(new Set([
      ...(this.activeWebSocketUrl ? [this.activeWebSocketUrl] : []),
      ...this.webSocketUrls,
    ]))
    let lastError: unknown
    if (this.webSocketFactory) {
      for (const candidate of webSocketCandidates) {
        try {
          const value = await this.requestFromWebSocket(
            candidate,
            method,
            path,
            authenticated,
            body,
          )
          this.activeWebSocketUrl = candidate
          return value
        } catch (error) {
          lastError = error
          if (!isNetworkFailure(error)) throw error
        }
      }
    }

    const candidates = Array.from(new Set([
      ...(this.activeBaseUrl ? [this.activeBaseUrl] : []),
      this.baseUrl,
      ...this.fallbackBaseUrls,
    ]))
    for (const [index, candidate] of candidates.entries()) {
      try {
        const value = await this.requestFrom(
          candidate,
          method,
          path,
          authenticated,
          body,
        )
        this.activeBaseUrl = candidate
        return value
      } catch (error) {
        lastError = error
        if (!isNetworkFailure(error) || index === candidates.length - 1) throw error
      }
    }
    throw lastError
  }

  private requestFromWebSocket(
    url: string,
    method: 'GET' | 'PATCH' | 'DELETE',
    path: string,
    authenticated: boolean,
    body?: unknown,
  ): Promise<unknown> {
    const factory = this.webSocketFactory
    if (!factory) return Promise.reject(new TypeError('WebSocket unavailable'))

    return new Promise((resolve, reject) => {
      let settled = false
      let socket: WebSocket | undefined
      const finish = (action: () => void) => {
        if (settled) return
        settled = true
        globalThis.clearTimeout(timeout)
        action()
      }
      const failNetwork = () => finish(() => reject(
        new TypeError('Local WebSocket connection failed'),
      ))
      const timeout = globalThis.setTimeout(() => {
        try {
          socket?.close()
        } catch {
          // The connection may fail before a socket is fully initialized.
        }
        finish(() => reject(new DOMException('Timed out', 'AbortError')))
      }, Math.min(this.timeoutMs, WEBSOCKET_TIMEOUT_MS))

      try {
        socket = factory(url)
      } catch {
        failNetwork()
        return
      }
      socket.onopen = () => {
        const envelope = {
          id: 1,
          method,
          path,
          ...(authenticated && this.accessKey
            ? { accessKey: this.accessKey }
            : {}),
          ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        }
        socket.send(JSON.stringify(envelope))
      }
      socket.onmessage = event => {
        try {
          const response = parseWebSocketResponse(event.data)
          if (response.id !== 1) throw new InvalidApiResponseError()
          if (response.status < 200 || response.status >= 300) {
            finish(() => reject(new ApiStatusError(response.status)))
            socket?.close()
            return
          }
          const value = response.status === 204
            ? undefined
            : JSON.parse(response.body) as unknown
          finish(() => resolve(value))
          socket?.close()
        } catch (error) {
          finish(() => reject(error))
          socket?.close()
        }
      }
      socket.onerror = failNetwork
      socket.onclose = failNetwork
    })
  }

  private async requestFrom(
    baseUrl: string,
    method: 'GET' | 'PATCH' | 'DELETE',
    path: string,
    authenticated: boolean,
    body?: unknown,
  ): Promise<unknown> {
    const controller = new AbortController()
    const timeout = globalThis.setTimeout(() => controller.abort(), this.timeoutMs)
    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'X-Send-To-G2-Client': 'even-hub',
      }
      if (authenticated && this.accessKey) {
        headers.Authorization = `Bearer ${this.accessKey}`
      }
      if (body !== undefined) {
        headers['Content-Type'] = 'application/json'
      }
      const response = await this.fetcher(`${baseUrl}${path}`, {
        method,
        headers,
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: controller.signal,
      })
      if (!response.ok) throw new ApiStatusError(response.status)
      if (response.status === 204) return undefined
      return await response.json() as unknown
    } finally {
      globalThis.clearTimeout(timeout)
    }
  }
}

const WEBSOCKET_TIMEOUT_MS = 1_500

function parseWebSocketResponse(value: unknown): WebSocketResponse {
  if (typeof value !== 'string') throw new InvalidApiResponseError()
  const parsed: unknown = JSON.parse(value)
  if (
    !isRecord(parsed) ||
    typeof parsed.id !== 'number' ||
    !Number.isSafeInteger(parsed.id) ||
    typeof parsed.status !== 'number' ||
    !Number.isSafeInteger(parsed.status) ||
    typeof parsed.body !== 'string'
  ) {
    throw new InvalidApiResponseError()
  }
  return { id: parsed.id, status: parsed.status, body: parsed.body }
}

function isNetworkFailure(error: unknown): boolean {
  return error instanceof TypeError ||
    (error instanceof DOMException && error.name === 'AbortError')
}

export class ApiStatusError extends Error {
  constructor(readonly status: number) {
    super(`Local API returned HTTP ${status}`)
  }
}

export class InvalidApiResponseError extends Error {
  constructor() {
    super('Local API returned an invalid response')
  }
}

function parseHealth(value: unknown): HealthResponse {
  if (!isRecord(value) || value.ok !== true || typeof value.version !== 'string') {
    throw new InvalidApiResponseError()
  }
  return { ok: true, version: value.version }
}

function parseSharedItem(value: unknown): SharedItem {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    (value.type !== 'text' && value.type !== 'url') ||
    typeof value.text !== 'string' ||
    value.text.length > 65_536 ||
    typeof value.createdAt !== 'number' ||
    !Number.isSafeInteger(value.createdAt) ||
    value.createdAt < 0 ||
    typeof value.read !== 'boolean' ||
    !optionalString(value.title) ||
    !optionalString(value.sourceApp)
  ) {
    throw new InvalidApiResponseError()
  }

  return {
    id: value.id,
    type: value.type,
    text: value.text,
    createdAt: value.createdAt,
    read: value.read,
    ...(value.title === undefined ? {} : { title: value.title }),
    ...(value.sourceApp === undefined ? {} : { sourceApp: value.sourceApp }),
  }
}

function parseScreenSnapshot(value: unknown): ScreenSnapshot {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    typeof value.createdAt !== 'number' ||
    !Number.isSafeInteger(value.createdAt) ||
    value.createdAt < 0 ||
    typeof value.width !== 'number' ||
    !Number.isInteger(value.width) ||
    value.width < 1 ||
    value.width > 288 ||
    typeof value.height !== 'number' ||
    !Number.isInteger(value.height) ||
    value.height < 1 ||
    value.height > 144 ||
    value.mimeType !== 'image/png' ||
    typeof value.imageBase64 !== 'string' ||
    value.imageBase64.length === 0 ||
    value.imageBase64.length > 512_000
  ) {
    throw new InvalidApiResponseError()
  }

  return {
    id: value.id,
    createdAt: value.createdAt,
    width: value.width,
    height: value.height,
    mimeType: value.mimeType,
    imageBase64: value.imageBase64,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string'
}
