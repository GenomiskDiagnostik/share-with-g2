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

  it.each(['listEvent', 'textEvent', 'sysEvent'] as const)(
    'treats an omitted zero-value event type from %s as click',
    source => {
      const tracker = new R1InputTracker()
      expect(tracker.handle({ [source]: {} })).toMatchObject({ kind: 'click' })
    },
  )

  it('keeps selection data when a list click omits its zero-value type', () => {
    const tracker = new R1InputTracker()
    expect(tracker.handle({
      listEvent: {
        currentSelectItemName: '2. [New] Selected item',
        currentSelectItemIndex: 2,
      },
    })).toEqual({
      kind: 'click',
      selectedName: '2. [New] Selected item',
      selectedIndex: 2,
    })
  })

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

  it('reads a raw SDK jsonData payload when normalized event fields are absent', () => {
    const tracker = new R1InputTracker()

    expect(tracker.handle({
      jsonData: {
        data: {
          Event_Type: 'SCROLL_BOTTOM_EVENT',
          CurrentSelect_ItemName: '3. [New] Raw payload',
          CurrentSelect_ItemIndex: '3',
        },
      },
    })).toEqual({
      kind: 'scroll-bottom',
      selectedName: '3. [New] Raw payload',
      selectedIndex: 3,
    })

    expect(tracker.handle({
      jsonData: { Event_Type: 0 },
    })).toMatchObject({ kind: 'click', selectedIndex: 3 })
  })

  it('normalizes raw double-click and exit names', () => {
    const tracker = new R1InputTracker()
    expect(tracker.handle({ jsonData: { event_type: 'DOUBLE_CLICK' } }).kind)
      .toBe('double-click')
    expect(tracker.handle({ jsonData: { event_type: 'SYSTEM_EXIT_EVENT' } }).kind)
      .toBe('exit')
  })

  it('ignores an event without a supported input', () => {
    expect(new R1InputTracker().handle({})).toEqual({ kind: 'other' })
  })
})
