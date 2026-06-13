import { describe, expect, it, vi } from 'vitest'
import {
  InvalidApiResponseError,
  LocalApiClient,
} from './localApiClient'

describe('LocalApiClient', () => {
  it('loads and validates health', async () => {
    const fetcher = vi.fn(async () => jsonResponse({ ok: true, version: '0.1.0' }))
    const client = new LocalApiClient('http://127.0.0.1:8765', fetcher)

    await expect(client.health()).resolves.toEqual({ ok: true, version: '0.1.0' })
  })

  it('accepts text and url items', async () => {
    const fetcher = vi.fn(async () => jsonResponse([
      {
        id: 'one',
        type: 'url',
        title: 'Example',
        text: 'https://example.com',
        createdAt: 100,
        read: false,
      },
    ]))
    const client = new LocalApiClient('http://127.0.0.1:8765', fetcher)

    await expect(client.items()).resolves.toHaveLength(1)
  })

  it('rejects unknown item types before rendering', async () => {
    const fetcher = vi.fn(async () => jsonResponse([
      {
        id: 'one',
        type: 'file',
        text: 'not supported',
        createdAt: 100,
        read: false,
      },
    ]))
    const client = new LocalApiClient('http://127.0.0.1:8765', fetcher)

    await expect(client.items()).rejects.toBeInstanceOf(InvalidApiResponseError)
  })
})

function jsonResponse(value: unknown): Response {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
