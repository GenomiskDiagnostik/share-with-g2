export const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8765'

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

export class LocalApiClient {
  constructor(
    private readonly baseUrl = DEFAULT_API_BASE_URL,
    private readonly fetcher: Fetcher = fetch,
    private readonly timeoutMs = 3_000,
    private readonly accessKey?: string,
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
      const response = await this.fetcher(`${this.baseUrl}${path}`, {
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
