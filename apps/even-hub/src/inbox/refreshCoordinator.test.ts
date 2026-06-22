import { describe, expect, it, vi } from 'vitest'
import { RefreshCoordinator, type RefreshOutcome } from './refreshCoordinator'

describe('refresh coordinator', () => {
  it('shares one active refresh between automatic and manual callers', async () => {
    let resolveRefresh: ((value: RefreshOutcome) => void) | undefined
    const refresh = vi.fn(() => new Promise<RefreshOutcome>(resolve => {
      resolveRefresh = resolve
    }))
    const schedule = vi.fn(() => 1)
    const coordinator = new RefreshCoordinator(refresh, schedule)

    coordinator.start()
    const manual = coordinator.refreshNow()

    expect(refresh).toHaveBeenCalledTimes(1)
    resolveRefresh?.('success')
    await manual
    expect(schedule).toHaveBeenCalledWith(expect.any(Function), 10_000)
  })

  it('recovers automatically after startup failures', async () => {
    const outcomes: RefreshOutcome[] = [
      'retryable-failure',
      'retryable-failure',
      'success',
    ]
    const refresh = vi.fn(async () => outcomes.shift() ?? 'success')
    const scheduled: Array<{ callback: () => void; delay: number }> = []
    const coordinator = new RefreshCoordinator(
      refresh,
      (callback, delay) => {
        scheduled.push({ callback, delay })
        return scheduled.length
      },
    )

    coordinator.start()
    await vi.waitFor(() => expect(scheduled[0]?.delay).toBe(1_000))
    scheduled.shift()?.callback()
    await vi.waitFor(() => expect(scheduled[0]?.delay).toBe(3_000))
    scheduled.shift()?.callback()
    await vi.waitFor(() => expect(scheduled[0]?.delay).toBe(10_000))
    expect(refresh).toHaveBeenCalledTimes(3)
  })

  it('stops retrying after a terminal failure', async () => {
    const schedule = vi.fn(() => 1)
    const coordinator = new RefreshCoordinator(
      async () => 'terminal-failure',
      schedule,
    )

    coordinator.start()
    await vi.waitFor(() => expect(schedule).not.toHaveBeenCalled())
  })
})
