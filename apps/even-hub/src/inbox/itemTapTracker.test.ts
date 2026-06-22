import { describe, expect, it, vi } from 'vitest'
import { ItemTapTracker } from './itemTapTracker'

describe('item tap tracker', () => {
  it('accepts an item after the double-tap window expires', () => {
    const singleTap = vi.fn()
    const scheduled: Array<() => void> = []
    const tracker = new ItemTapTracker(
      singleTap,
      vi.fn(),
      callback => {
        scheduled.push(callback)
        return 1
      },
    )

    tracker.tap(2)
    expect(singleTap).not.toHaveBeenCalled()
    scheduled[0]?.()
    expect(singleTap).toHaveBeenCalledWith(2)
  })

  it('maps two taps on the same item to delete instead of accept', () => {
    const singleTap = vi.fn()
    const doubleTap = vi.fn()
    const cancel = vi.fn()
    const tracker = new ItemTapTracker(singleTap, doubleTap, () => 7, cancel)

    tracker.tap(1)
    tracker.tap(1)

    expect(cancel).toHaveBeenCalledWith(7)
    expect(singleTap).not.toHaveBeenCalled()
    expect(doubleTap).toHaveBeenCalledWith(1)
  })

  it('starts a new gesture when the second tap targets another item', () => {
    const doubleTap = vi.fn()
    const cancel = vi.fn()
    const tracker = new ItemTapTracker(vi.fn(), doubleTap, () => 4, cancel)

    tracker.tap(0)
    tracker.tap(1)

    expect(cancel).toHaveBeenCalledWith(4)
    expect(doubleTap).not.toHaveBeenCalled()
  })

  it('accepts an explicit host double-click and cancels a pending click', () => {
    const singleTap = vi.fn()
    const doubleTap = vi.fn()
    const cancel = vi.fn()
    const tracker = new ItemTapTracker(singleTap, doubleTap, () => 9, cancel)

    tracker.tap(3)
    tracker.doubleTapNow(3)

    expect(cancel).toHaveBeenCalledWith(9)
    expect(singleTap).not.toHaveBeenCalled()
    expect(doubleTap).toHaveBeenCalledWith(3)
  })
})
