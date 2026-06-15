import type { SharedItem } from '../api/localApiClient'
import { paginateText } from './pagination'

export type ReaderState =
  | { status: 'loading' }
  | { status: 'error'; reason: ReaderFailureReason }
  | { status: 'empty' }
  | {
      status: 'ready'
      items: SharedItem[]
      selectedIndex: number
      pageIndex: number
    }

export type ReaderAction =
  | { type: 'load'; items: SharedItem[] }
  | { type: 'refresh'; items: SharedItem[] }
  | { type: 'fail'; reason: ReaderFailureReason }
  | { type: 'next-item' }
  | { type: 'previous-item' }
  | { type: 'next-page' }
  | { type: 'previous-page' }
  | { type: 'delete-current' }
  | { type: 'clear' }
  | { type: 'update-current-read'; read: boolean }

export type ReaderNavigationAction = Exclude<
  ReaderAction,
  | { type: 'load' }
  | { type: 'refresh' }
  | { type: 'fail' }
  | { type: 'delete-current' }
  | { type: 'clear' }
  | { type: 'update-current-read' }
>

export type ReaderFailureReason =
  | 'unauthorized'
  | 'timeout'
  | 'http'
  | 'invalid-response'
  | 'network'

export function reduceReader(
  state: ReaderState,
  action: ReaderAction,
): ReaderState {
  if (action.type === 'load') {
    return action.items.length === 0
      ? { status: 'empty' }
      : {
          status: 'ready',
          items: action.items,
          selectedIndex: 0,
          pageIndex: 0,
        }
  }

  if (action.type === 'refresh') {
    return refreshItems(state, action.items)
  }

  if (action.type === 'fail') {
    return { status: 'error', reason: action.reason }
  }

  if (state.status !== 'ready') return state

  if (action.type === 'clear') return { status: 'empty' }

  if (action.type === 'update-current-read') {
    return {
      ...state,
      items: state.items.map((item, index) =>
        index === state.selectedIndex ? { ...item, read: action.read } : item,
      ),
    }
  }

  if (action.type === 'delete-current') {
    const items = state.items.filter((_, index) => index !== state.selectedIndex)
    if (items.length === 0) return { status: 'empty' }
    return {
      status: 'ready',
      items,
      selectedIndex: Math.min(state.selectedIndex, items.length - 1),
      pageIndex: 0,
    }
  }

  if (action.type === 'next-item') {
    return {
      ...state,
      selectedIndex: (state.selectedIndex + 1) % state.items.length,
      pageIndex: 0,
    }
  }

  if (action.type === 'previous-item') {
    return {
      ...state,
      selectedIndex:
        (state.selectedIndex - 1 + state.items.length) % state.items.length,
      pageIndex: 0,
    }
  }

  const pageCount = getCurrentPages(state).length
  if (action.type === 'next-page') {
    return {
      ...state,
      pageIndex: Math.min(state.pageIndex + 1, pageCount - 1),
    }
  }

  return {
    ...state,
    pageIndex: Math.max(state.pageIndex - 1, 0),
  }
}

function refreshItems(
  state: ReaderState,
  items: SharedItem[],
): ReaderState {
  if (items.length === 0) return { status: 'empty' }
  if (state.status !== 'ready') {
    return {
      status: 'ready',
      items,
      selectedIndex: 0,
      pageIndex: 0,
    }
  }

  const currentId = state.items[state.selectedIndex]?.id
  const matchingIndex = items.findIndex(item => item.id === currentId)
  const selectedIndex = matchingIndex >= 0
    ? matchingIndex
    : Math.min(state.selectedIndex, items.length - 1)
  const nextState = {
    status: 'ready' as const,
    items,
    selectedIndex,
    pageIndex: state.pageIndex,
  }
  const pageCount = getCurrentPages(nextState).length
  return {
    ...nextState,
    pageIndex: matchingIndex >= 0
      ? Math.min(state.pageIndex, pageCount - 1)
      : 0,
  }
}

export function getCurrentItem(state: ReaderState): SharedItem | undefined {
  return state.status === 'ready' ? state.items[state.selectedIndex] : undefined
}

export function getCurrentPages(state: ReaderState): string[] {
  const item = getCurrentItem(state)
  return item ? paginateText(item.text) : ['']
}
