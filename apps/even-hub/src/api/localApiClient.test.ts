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
    expect(fetcher).toHaveBeenCalledWith(
      'http://127.0.0.1:8765/health',
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          'X-Send-To-G2-Client': 'even-hub',
        },
      }),
    )
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
    const client = new LocalApiClient(
      'http://127.0.0.1:8765',
      fetcher,
      3_000,
      'private-key',
    )

    await expect(client.items()).resolves.toHaveLength(1)
    expect(fetcher).toHaveBeenCalledWith(
      'http://127.0.0.1:8765/items',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer private-key',
        }),
      }),
    )
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

  it('does not send the access key to the public health endpoint', async () => {
    const fetcher = vi.fn(async () => jsonResponse({ ok: true, version: '0.1.0' }))
    const client = new LocalApiClient(
      'http://127.0.0.1:8765',
      fetcher,
      3_000,
      'private-key',
    )

    await client.health()

    expect(fetcher).toHaveBeenCalledWith(
      'http://127.0.0.1:8765/health',
      expect.objectContaining({
        headers: expect.not.objectContaining({ Authorization: expect.anything() }),
      }),
    )
  })
})

function jsonResponse(value: unknown): Response {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
