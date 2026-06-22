import { describe, expect, it } from 'vitest'
import { OsEventTypeList } from '@evenrealities/even_hub_sdk'
import { R1InputTracker } from './r1Input'

describe('R1 input tracker', () => {
  it('remembers list selection from scroll for a later system click', () => {
    const tracker = new R1InputTracker()

    expect(tracker.handle({
      listEvent: {
        eventType: OsEventTypeList.SCROLL_BOTTOM_EVENT,
        currentSelectItemName: '2. [Ny] Andet element',
        currentSelectItemIndex: 2,
      },
    })).toMatchObject({ kind: 'scroll-bottom', selectedIndex: 2 })

    expect(tracker.handle({
      sysEvent: { eventType: OsEventTypeList.CLICK_EVENT },
    })).toEqual({
      kind: 'click',
      selectedName: '2. [Ny] Andet element',
      selectedIndex: 2,
    })
  })

  it.each(['listEvent', 'textEvent', 'sysEvent'] as const)(
    'accepts a click from %s',
    source => {
      const tracker = new R1InputTracker()
      expect(tracker.handle({
        [source]: { eventType: OsEventTypeList.CLICK_EVENT },
      })).toMatchObject({ kind: 'click' })
    },
  )

  it('prioritizes a click when the host also includes a scroll event', () => {
    const tracker = new R1InputTracker()
    expect(tracker.handle({
      listEvent: {
        eventType: OsEventTypeList.SCROLL_BOTTOM_EVENT,
        currentSelectItemIndex: 1,
      },
      sysEvent: { eventType: OsEventTypeList.CLICK_EVENT },
    })).toEqual({ kind: 'click', selectedIndex: 1 })
  })

  it('reports double click without treating it as a click', () => {
    const tracker = new R1InputTracker()
    expect(tracker.handle({
      sysEvent: { eventType: OsEventTypeList.DOUBLE_CLICK_EVENT },
    })).toEqual({ kind: 'double-click' })
  })

  it('ignores an event without a supported input', () => {
    expect(new R1InputTracker().handle({})).toEqual({ kind: 'other' })
  })
})
