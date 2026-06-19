export type ReaderPageAction = 'previous-page' | 'next-page'
export type ReaderBoundaryEvent = 'top' | 'bottom'

export class ReaderScrollGate {
  private blockedUntil = 0

  constructor(private readonly cooldownMs = 800) {}

  actionFor(
    event: ReaderBoundaryEvent,
    pageIndex: number,
    pageCount: number,
    now = Date.now(),
  ): ReaderPageAction | undefined {
    if (now < this.blockedUntil || pageCount <= 1) return undefined

    const action = event === 'bottom'
      ? pageIndex < pageCount - 1 ? 'next-page' : undefined
      : pageIndex > 0 ? 'previous-page' : undefined
    if (!action) return undefined

    this.blockedUntil = now + this.cooldownMs
    return action
  }
}
