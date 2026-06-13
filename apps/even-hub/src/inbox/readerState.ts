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
  | { type: 'fail'; reason: ReaderFailureReason }
  | { type: 'next-item' }
  | { type: 'previous-item' }
  | { type: 'next-page' }
  | { type: 'previous-page' }

export type ReaderNavigationAction = Exclude<
  ReaderAction,
  { type: 'load' } | { type: 'fail' }
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

  if (action.type === 'fail') {
    return { status: 'error', reason: action.reason }
  }

  if (state.status !== 'ready') return state

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

export function getCurrentItem(state: ReaderState): SharedItem | undefined {
  return state.status === 'ready' ? state.items[state.selectedIndex] : undefined
}

export function getCurrentPages(state: ReaderState): string[] {
  const item = getCurrentItem(state)
  return item ? paginateText(item.text) : ['']
}
