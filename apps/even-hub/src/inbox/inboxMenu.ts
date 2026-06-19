import type { SharedItem } from '../api/localApiClient'

export type InboxMenuLabels = {
  untitled: string
  unread: string
  read: string
  previous: string
  next: string
}

export type InboxMenuEntry =
  | { kind: 'item'; itemIndex: number; label: string }
  | { kind: 'previous-page'; label: string }
  | { kind: 'next-page'; label: string }

export type InboxMenuPage = {
  pageIndex: number
  pageCount: number
  entries: InboxMenuEntry[]
}

const ITEMS_PER_PAGE = 18
const MAX_LABEL_LENGTH = 64

export function buildInboxMenu(
  items: readonly SharedItem[],
  requestedPageIndex: number,
  labels: InboxMenuLabels,
): InboxMenuPage {
  const pageCount = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE))
  const pageIndex = Math.max(0, Math.min(requestedPageIndex, pageCount - 1))
  const start = pageIndex * ITEMS_PER_PAGE
  const entries: InboxMenuEntry[] = items
    .slice(start, start + ITEMS_PER_PAGE)
    .map((item, localIndex) => {
      const itemIndex = start + localIndex
      const title = item.title?.trim() || labels.untitled
      const readState = item.read ? labels.read : labels.unread
      return {
        kind: 'item' as const,
        itemIndex,
        label: clampLabel(`${itemIndex + 1}. [${readState}] ${title}`),
      }
    })

  if (pageIndex > 0) {
    entries.unshift({ kind: 'previous-page', label: labels.previous })
  }
  if (pageIndex < pageCount - 1) {
    entries.push({ kind: 'next-page', label: labels.next })
  }

  return { pageIndex, pageCount, entries }
}

export function findInboxMenuEntry(
  page: InboxMenuPage,
  selectedName: string | undefined,
): InboxMenuEntry | undefined {
  if (!selectedName) return undefined
  return page.entries.find(entry => entry.label === selectedName)
}

export function getInboxMenuPageIndex(itemIndex: number): number {
  return Math.max(0, Math.floor(itemIndex / ITEMS_PER_PAGE))
}

function clampLabel(value: string): string {
  if (value.length <= MAX_LABEL_LENGTH) return value
  return value.slice(0, MAX_LABEL_LENGTH - 3).trimEnd() + '...'
}
