import { OsEventTypeList } from '@evenrealities/even_hub_sdk'

type EventPart = {
  eventType?: unknown
}

type ListEventPart = EventPart & {
  currentSelectItemName?: string
  currentSelectItemIndex?: number
}

export type R1Event = {
  listEvent?: ListEventPart
  textEvent?: EventPart
  sysEvent?: EventPart
  jsonData?: Record<string, unknown>
}

export type R1InputKind =
  | 'click'
  | 'double-click'
  | 'scroll-top'
  | 'scroll-bottom'
  | 'exit'
  | 'other'

export type R1Input = {
  kind: R1InputKind
  selectedName?: string
  selectedIndex?: number
}

export class R1InputTracker {
  private selectedName: string | undefined
  private selectedIndex: number | undefined

  handle(event: R1Event): R1Input {
    const listEvent = event.listEvent
    if (listEvent?.currentSelectItemName) {
      this.selectedName = listEvent.currentSelectItemName
    }
    if (
      listEvent?.currentSelectItemIndex !== undefined &&
      Number.isInteger(listEvent.currentSelectItemIndex) &&
      listEvent.currentSelectItemIndex >= 0
    ) {
      this.selectedIndex = listEvent.currentSelectItemIndex
    }

    const eventTypes = [
      listEvent?.eventType,
      event.textEvent?.eventType,
      event.sysEvent?.eventType,
      ...findRawValues(event.jsonData, 'eventtype'),
    ].map(value => OsEventTypeList.fromJson(value))
      .filter((value): value is OsEventTypeList => value !== undefined)

    const rawSelectedName = findRawValues(event.jsonData, 'currentselectitemname')
      .find((value): value is string => typeof value === 'string' && value.length > 0)
    const rawSelectedIndex = findRawValues(event.jsonData, 'currentselectitemindex')
      .map(toIndex)
      .find((value): value is number => value !== undefined)
    if (rawSelectedName) this.selectedName = rawSelectedName
    if (rawSelectedIndex !== undefined) {
      this.selectedIndex = rawSelectedIndex
    }

    return {
      kind: classifyEvent(eventTypes),
      ...(this.selectedName === undefined ? {} : { selectedName: this.selectedName }),
      ...(this.selectedIndex === undefined ? {} : { selectedIndex: this.selectedIndex }),
    }
  }
}

function findRawValues(
  value: unknown,
  wantedKey: string,
  depth = 0,
): unknown[] {
  if (!value || typeof value !== 'object' || depth > 3) return []
  const values: unknown[] = []
  for (const [key, child] of Object.entries(value)) {
    if (normalizeKey(key) === wantedKey) values.push(child)
    if (child && typeof child === 'object') {
      values.push(...findRawValues(child, wantedKey, depth + 1))
    }
  }
  return values
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function toIndex(value: unknown): number | undefined {
  const number = typeof value === 'string' && value.trim()
    ? Number(value)
    : value
  return typeof number === 'number' && Number.isInteger(number) && number >= 0
    ? number
    : undefined
}

function classifyEvent(eventTypes: readonly OsEventTypeList[]): R1InputKind {
  if (
    eventTypes.includes(OsEventTypeList.SYSTEM_EXIT_EVENT) ||
    eventTypes.includes(OsEventTypeList.ABNORMAL_EXIT_EVENT)
  ) return 'exit'
  if (eventTypes.includes(OsEventTypeList.CLICK_EVENT)) return 'click'
  if (eventTypes.includes(OsEventTypeList.DOUBLE_CLICK_EVENT)) return 'double-click'
  if (eventTypes.includes(OsEventTypeList.SCROLL_TOP_EVENT)) return 'scroll-top'
  if (eventTypes.includes(OsEventTypeList.SCROLL_BOTTOM_EVENT)) return 'scroll-bottom'
  return 'other'
}
