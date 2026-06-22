import { OsEventTypeList } from '@evenrealities/even_hub_sdk'

type EventPart = {
  eventType?: OsEventTypeList
}

type ListEventPart = EventPart & {
  currentSelectItemName?: string
  currentSelectItemIndex?: number
}

export type R1Event = {
  listEvent?: ListEventPart
  textEvent?: EventPart
  sysEvent?: EventPart
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
    ].filter((value): value is OsEventTypeList => value !== undefined)

    return {
      kind: classifyEvent(eventTypes),
      ...(this.selectedName === undefined ? {} : { selectedName: this.selectedName }),
      ...(this.selectedIndex === undefined ? {} : { selectedIndex: this.selectedIndex }),
    }
  }
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
