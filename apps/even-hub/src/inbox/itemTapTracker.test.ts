import { describe, expect, it, vi } from 'vitest'
import { ItemTapTracker } from './itemTapTracker'

describe('item tap tracker', () => {
  it('accepts an item immediately without scheduling a timer', () => {
    const singleTap = vi.fn()
    const tracker = new ItemTapTracker(singleTap, vi.fn())

    tracker.tap(2, 1_000)
    expect(singleTap).toHaveBeenCalledWith(2)
  })

  it('maps a second timestamped tap on the same item to delete', () => {
    const singleTap = vi.fn()
    const doubleTap = vi.fn()
    const tracker = new ItemTapTracker(singleTap, doubleTap)

    tracker.tap(1, 1_000)
    tracker.tap(1, 1_300)

    expect(singleTap).toHaveBeenCalledOnce()
    expect(doubleTap).toHaveBeenCalledWith(1)
  })

  it('starts a new gesture when the second tap targets another item', () => {
    const doubleTap = vi.fn()
    const singleTap = vi.fn()
    const tracker = new ItemTapTracker(singleTap, doubleTap)

    tracker.tap(0, 1_000)
    tracker.tap(1, 1_200)

    expect(singleTap).toHaveBeenCalledTimes(2)
    expect(doubleTap).not.toHaveBeenCalled()
  })

  it('accepts an explicit host double-click without a timer', () => {
    const singleTap = vi.fn()
    const doubleTap = vi.fn()
    const tracker = new ItemTapTracker(singleTap, doubleTap)

    tracker.doubleTapNow(3)

    expect(singleTap).not.toHaveBeenCalled()
    expect(doubleTap).toHaveBeenCalledWith(3)
  })
})
