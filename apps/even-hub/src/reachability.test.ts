import { describe, expect, it } from 'vitest'
import { describeResult, probeLocalApi } from './reachability'

describe('probeLocalApi', () => {
  it('reports API version and item count', async () => {
    const client = {
      health: async () => ({ ok: true as const, version: '0.1.0' }),
      items: async () => [],
    }

    await expect(probeLocalApi(client)).resolves.toEqual({
      state: 'connected',
      version: '0.1.0',
      itemCount: 0,
    })
  })

  it('maps network failures to a stable Danish message', async () => {
    const client = {
      health: async () => {
        throw new TypeError('Failed to fetch')
      },
      items: async () => [],
    }

    const result = await probeLocalApi(client)
    expect(result).toEqual({ state: 'failed', reason: 'network' })
    expect(describeResult(result, 'da').summary).toContain('localhost')
  })
})
