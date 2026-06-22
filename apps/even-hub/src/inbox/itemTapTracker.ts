export class ItemTapTracker {
  private previousIndex: number | undefined
  private previousTapAt = 0

  constructor(
    private readonly onSingleTap: (index: number) => void,
    private readonly onDoubleTap: (index: number) => void,
    private readonly doubleTapMs = 350,
    private readonly now: () => number = Date.now,
  ) {}

  tap(index: number, at = this.now()): void {
    if (
      this.previousIndex === index &&
      at >= this.previousTapAt &&
      at - this.previousTapAt <= this.doubleTapMs
    ) {
      this.clearPrevious()
      this.onDoubleTap(index)
      return
    }

    this.previousIndex = index
    this.previousTapAt = at
    this.onSingleTap(index)
  }

  doubleTapNow(index: number): void {
    this.clearPrevious()
    this.onDoubleTap(index)
  }

  private clearPrevious(): void {
    this.previousIndex = undefined
    this.previousTapAt = 0
  }
}
