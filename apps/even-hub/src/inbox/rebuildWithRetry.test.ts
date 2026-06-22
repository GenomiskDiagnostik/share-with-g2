import { describe, expect, it, vi } from 'vitest'
import { rebuildWithRetry } from './rebuildWithRetry'

describe('menu rebuild retry', () => {
  it('returns immediately after a successful rebuild', async () => {
    const rebuild = vi.fn(async () => true)
    const wait = vi.fn(async () => undefined)

    await expect(rebuildWithRetry(rebuild, [0, 400], wait)).resolves.toBe(true)
    expect(rebuild).toHaveBeenCalledTimes(1)
    expect(wait).not.toHaveBeenCalled()
  })

  it('retries failed rebuilds with bounded delays', async () => {
    const rebuild = vi
      .fn<() => Promise<boolean>>()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
    const wait = vi.fn(async () => undefined)

    await expect(rebuildWithRetry(rebuild, [0, 400, 800], wait)).resolves.toBe(true)
    expect(rebuild).toHaveBeenCalledTimes(3)
    expect(wait.mock.calls).toEqual([[400], [800]])
  })

  it('returns false after all attempts fail', async () => {
    const rebuild = vi.fn(async () => false)

    await expect(rebuildWithRetry(rebuild, [0], vi.fn())).resolves.toBe(false)
  })

  it('retries a transient bridge rejection', async () => {
    const rebuild = vi
      .fn<() => Promise<boolean>>()
      .mockRejectedValueOnce(new Error('bridge busy'))
      .mockResolvedValueOnce(true)

    await expect(rebuildWithRetry(rebuild, [0, 1], vi.fn())).resolves.toBe(true)
    expect(rebuild).toHaveBeenCalledTimes(2)
  })
})
