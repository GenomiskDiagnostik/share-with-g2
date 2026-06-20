import { OsEventTypeList } from '@evenrealities/even_hub_sdk'
import { describe, expect, it } from 'vitest'
import { isReaderReturnEvent } from './readerGesture'

describe('reader return gesture', () => {
  it('returns to the menu on single-click or double-click', () => {
    expect(isReaderReturnEvent(OsEventTypeList.CLICK_EVENT)).toBe(true)
    expect(isReaderReturnEvent(OsEventTypeList.DOUBLE_CLICK_EVENT)).toBe(true)
  })

  it('leaves scroll events for page navigation', () => {
    expect(isReaderReturnEvent(OsEventTypeList.SCROLL_TOP_EVENT)).toBe(false)
    expect(isReaderReturnEvent(OsEventTypeList.SCROLL_BOTTOM_EVENT)).toBe(false)
    expect(isReaderReturnEvent(null)).toBe(false)
  })
})
