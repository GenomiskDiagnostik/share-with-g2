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

type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>

export class LocalApiClient {
  constructor(
    private readonly baseUrl = DEFAULT_API_BASE_URL,
    private readonly fetcher: Fetcher = fetch,
    private readonly timeoutMs = 3_000,
  ) {}

  async health(): Promise<HealthResponse> {
    return parseHealth(await this.get('/health'))
  }

  async items(): Promise<SharedItem[]> {
    const value: unknown = await this.get('/items')
    if (!Array.isArray(value)) throw new InvalidApiResponseError()
    return value.map(parseSharedItem)
  }

  private async get(path: string): Promise<unknown> {
    const controller = new AbortController()
    const timeout = globalThis.setTimeout(() => controller.abort(), this.timeoutMs)
    try {
      const response = await this.fetcher(`${this.baseUrl}${path}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-Send-To-G2-Client': 'even-hub',
        },
        signal: controller.signal,
      })
      if (!response.ok) throw new ApiStatusError(response.status)
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string'
}
