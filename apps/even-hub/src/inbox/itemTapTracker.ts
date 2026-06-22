type Schedule = (callback: () => void, delayMs: number) => number
type Cancel = (timer: number) => void

export class ItemTapTracker {
  private timer: number | undefined
  private index: number | undefined

  constructor(
    private readonly onSingleTap: (index: number) => void,
    private readonly onDoubleTap: (index: number) => void,
    private readonly schedule: Schedule = (callback, delayMs) =>
      window.setTimeout(callback, delayMs),
    private readonly cancel: Cancel = timer => window.clearTimeout(timer),
    private readonly doubleTapMs = 280,
  ) {}

  tap(index: number): void {
    if (this.timer !== undefined && this.index === index) {
      this.doubleTapNow(index)
      return
    }

    if (this.timer !== undefined) this.cancel(this.timer)
    this.index = index
    this.timer = this.schedule(() => {
      this.clearPending()
      this.onSingleTap(index)
    }, this.doubleTapMs)
  }

  doubleTapNow(index: number): void {
    if (this.timer !== undefined) this.cancel(this.timer)
    this.clearPending()
    this.onDoubleTap(index)
  }

  private clearPending(): void {
    this.timer = undefined
    this.index = undefined
  }
}
