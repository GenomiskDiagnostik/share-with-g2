import type { ScreenSnapshot } from '../api/localApiClient'
import { getStrings, type SupportedLocale } from '../strings'
import type { ReaderFailureReason } from '../inbox/readerState'

export type SnapshotState =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; reason: ReaderFailureReason }
  | { status: 'ready'; snapshot: ScreenSnapshot }

export type SnapshotView = {
  status: SnapshotState['status']
  heading: string
  body: string
  meta: string
  help: string
  glassText: string
  needsPairing: boolean
  imageSrc?: string
  imageAlt: string
}

export function renderSnapshot(
  state: SnapshotState,
  locale: SupportedLocale,
): SnapshotView {
  const copy = getStrings(locale)

  if (state.status === 'loading') {
    return staticView('loading', copy.snapshotTitle, copy.snapshotLoading, copy)
  }

  if (state.status === 'empty') {
    return staticView('empty', copy.snapshotTitle, copy.snapshotEmpty, copy)
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

  const meta = copy.snapshotMeta(state.snapshot.width, state.snapshot.height)
  const imageSrc = `${state.snapshot.mimeType};base64,${state.snapshot.imageBase64}`
  const glassText = `Send to G2\n\n${copy.snapshotTitle}\n${meta}\n\n${copy.snapshotHelp}`
  return {
    status: 'ready',
    heading: copy.snapshotTitle,
    body: copy.snapshotReady,
    meta,
    help: copy.snapshotHelp,
    glassText,
    needsPairing: false,
    imageSrc: `data:${imageSrc}`,
    imageAlt: copy.snapshotImageAlt,
  }
}

function staticView(
  status: 'loading' | 'empty' | 'error',
  heading: string,
  body: string,
  copy: ReturnType<typeof getStrings>,
  needsPairing = false,
): SnapshotView {
  return {
    status,
    heading,
    body,
    meta: '',
    help: status === 'error' ? copy.retry : '',
    glassText: `Send to G2\n\n${heading}\n\n${body}`,
    needsPairing,
    imageAlt: copy.snapshotImageAlt,
  }
}
