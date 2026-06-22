export type RefreshOutcome = 'success' | 'retryable-failure' | 'terminal-failure'

type Schedule = (callback: () => void, delayMs: number) => number
type Cancel = (timer: number) => void

export class RefreshCoordinator {
  private activeRefresh: Promise<RefreshOutcome> | undefined
  private timer: number | undefined
  private stopped = false

  constructor(
    private readonly refresh: () => Promise<RefreshOutcome>,
    private readonly schedule: Schedule = (callback, delayMs) =>
      window.setTimeout(callback, delayMs),
    private readonly cancel: Cancel = timer => window.clearTimeout(timer),
    private readonly retryDelays: readonly number[] = [1_000, 3_000],
    private readonly intervalMs = 10_000,
  ) {}

  start(): void {
    this.stopped = false
    void this.runAutomatic(0)
  }

  refreshNow(): Promise<RefreshOutcome> {
    if (this.activeRefresh) return this.activeRefresh
    const active = this.refresh().finally(() => {
      if (this.activeRefresh === active) this.activeRefresh = undefined
    })
    this.activeRefresh = active
    return active
  }

  stop(): void {
    this.stopped = true
    if (this.timer !== undefined) {
      this.cancel(this.timer)
      this.timer = undefined
    }
  }

  private async runAutomatic(retryIndex: number): Promise<void> {
    const outcome = await this.refreshNow()
    if (this.stopped || outcome === 'terminal-failure') return

    const retryDelay = this.retryDelays[retryIndex]
    const delay = outcome === 'success'
      ? this.intervalMs
      : retryDelay ?? this.intervalMs
    const nextRetryIndex = outcome === 'success' ? 0 : retryIndex + 1
    this.timer = this.schedule(() => {
      this.timer = undefined
      void this.runAutomatic(nextRetryIndex)
    }, delay)
  }
}
