import { describe, expect, it } from 'vitest'
import { OsEventTypeList } from '@evenrealities/even_hub_sdk'
import { nativeListAction, normalizeBridgeEvent } from './bridgeEvent'
import { R1InputTracker } from './r1Input'

describe('bridge event normalization', () => {
  it('preserves an already typed zero-value click envelope', () => {
    const normalized = normalizeBridgeEvent({ sysEvent: {} })

    expect(normalized.source).toBe('typed')
    expect(new R1InputTracker().handle(normalized.event).kind).toBe('click')
  })

  it('parses a raw system envelope with an omitted click type', () => {
    const normalized = normalizeBridgeEvent({ type: 'sysEvent', jsonData: {} })

    expect(normalized.source).toBe('raw')
    expect(new R1InputTracker().handle(normalized.event).kind).toBe('click')
  })

  it('parses raw list selection and explicit double-click envelopes', () => {
    const list = normalizeBridgeEvent({
      type: 'list_event',
      data: { CurrentSelect_ItemName: 'Selected', CurrentSelect_ItemIndex: 2 },
    })
    const doubleClick = normalizeBridgeEvent({
      type: 'sys_event',
      data: { Event_Type: 3 },
    })

    expect(new R1InputTracker().handle(list.event)).toMatchObject({
      kind: 'click',
      selectedName: 'Selected',
      selectedIndex: 2,
    })
    expect(new R1InputTracker().handle(doubleClick.event).kind).toBe('double-click')
  })

  it('routes native list accept before generic gesture handling', () => {
    expect(nativeListAction({ currentSelectItemIndex: 2 })).toBe('accept')
    expect(nativeListAction({
      eventType: OsEventTypeList.CLICK_EVENT,
      currentSelectItemIndex: 2,
    })).toBe('accept')
    expect(nativeListAction({
      eventType: OsEventTypeList.DOUBLE_CLICK_EVENT,
      currentSelectItemIndex: 2,
    })).toBe('double-click')
  })

  it('leaves native list scroll entirely to firmware', () => {
    expect(nativeListAction({ eventType: OsEventTypeList.SCROLL_TOP_EVENT }))
      .toBeUndefined()
    expect(nativeListAction({ eventType: OsEventTypeList.SCROLL_BOTTOM_EVENT }))
      .toBeUndefined()
  })
})
