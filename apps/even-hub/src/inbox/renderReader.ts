import type { SharedItem } from '../api/localApiClient'
import { getCurrentItem, getCurrentPages, type ReaderState } from './readerState'
import { getStrings, type AppStrings, type SupportedLocale } from '../strings'

export type ReaderView = {
  status: ReaderState['status']
  eyebrow: string
  heading: string
  body: string
  meta: string
  help: string
  glassText: string
  canNavigateItems: boolean
  canNavigatePages: boolean
  needsPairing: boolean
}

export function renderReader(
  state: ReaderState,
  locale: SupportedLocale,
): ReaderView {
  const copy = getStrings(locale)

  if (state.status === 'loading') {
    return staticView('loading', copy.readerTitle, copy.readerLoading, copy)
  }

  if (state.status === 'error') {
    return staticView(
      'error',
      state.reason === 'unauthorized' ? copy.pairingTitle : copy.failedHeading,
      copy.readerFailure[state.reason],
      copy,
      state.reason === 'unauthorized',
    )
  }

  if (state.status === 'empty') {
    return staticView('empty', copy.readerTitle, copy.readerEmpty, copy)
  }

  const item = getCurrentItem(state)
  if (!item) return staticView('empty', copy.readerTitle, copy.readerEmpty, copy)

  const pages = getCurrentPages(state)
  const pageIndex = Math.min(state.pageIndex, pages.length - 1)
  const body = pages[pageIndex] ?? ''
  const title = item.title?.trim() || copy.untitled
  const meta = copy.readerMeta(
    state.selectedIndex + 1,
    state.items.length,
    pageIndex + 1,
    pages.length,
    item.type === 'url' ? copy.typeUrl : copy.typeText,
  )
  const help = copy.readerHelp
  const glassText = `${meta}\n${title}\n\n${body}\n\n${help}`

  return {
    status: 'ready',
    eyebrow: copy.readerTitle,
    heading: title,
    body,
    meta,
    help,
    glassText: clampGlassText(glassText),
    canNavigateItems: state.items.length > 1,
    canNavigatePages: pages.length > 1,
    needsPairing: false,
  }
}

export const DEMO_ITEMS: SharedItem[] = [
  {
    id: 'demo-long',
    type: 'text',
    title: 'Long reader demo',
    text: Array.from(
      { length: 18 },
      (_, index) =>
        `Paragraph ${index + 1}. This is sample text for testing page navigation on the G2 display without changing Android data.`,
    ).join('\n\n'),
    sourceApp: 'demo',
    createdAt: 1_710_000_000_000,
    read: false,
  },
  {
    id: 'demo-link',
    type: 'url',
    title: 'Even Hub documentation',
    text: 'https://hub.evenrealities.com/docs',
    sourceApp: 'demo',
    createdAt: 1_709_999_000_000,
    read: false,
  },
]

function staticView(
  status: 'loading' | 'error' | 'empty',
  heading: string,
  body: string,
  copy: AppStrings,
  needsPairing = false,
): ReaderView {
  return {
    status,
    eyebrow: copy.readerTitle,
    heading,
    body,
    meta: '',
    help: status === 'error' ? copy.retry : '',
    glassText: `Send to G2\n\n${heading}\n\n${body}`,
    canNavigateItems: false,
    canNavigatePages: false,
    needsPairing,
  }
}

function clampGlassText(value: string): string {
  return value.length <= 1_000 ? value : value.slice(0, 997).trimEnd() + '...'
}
