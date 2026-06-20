import { OsEventTypeList } from '@evenrealities/even_hub_sdk'

export function isReaderReturnEvent(
  eventType: OsEventTypeList | null,
): boolean {
  return (
    eventType === OsEventTypeList.CLICK_EVENT ||
    eventType === OsEventTypeList.DOUBLE_CLICK_EVENT
  )
}
