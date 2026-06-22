import {
  evenHubEventFromJson,
  OsEventTypeList,
} from '@evenrealities/even_hub_sdk'
import type { R1Event } from './r1Input'

export type NormalizedBridgeEvent = {
  event: R1Event
  source: 'typed' | 'raw'
}

export type NativeListAction = 'accept' | 'double-click'

export function nativeListAction(
  event: R1Event['listEvent'],
): NativeListAction | undefined {
  if (!event) return undefined
  const eventType = event.eventType === undefined
    ? OsEventTypeList.CLICK_EVENT
    : OsEventTypeList.fromJson(event.eventType)
  if (eventType === OsEventTypeList.CLICK_EVENT) return 'accept'
  if (eventType === OsEventTypeList.DOUBLE_CLICK_EVENT) return 'double-click'
  return undefined
}

export function normalizeBridgeEvent(value: unknown): NormalizedBridgeEvent {
  if (hasTypedEventPart(value)) {
    return { event: value, source: 'typed' }
  }
  return {
    event: evenHubEventFromJson(value) as R1Event,
    source: 'raw',
  }
}

function hasTypedEventPart(value: unknown): value is R1Event {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return record.listEvent !== undefined ||
    record.textEvent !== undefined ||
    record.sysEvent !== undefined
}
