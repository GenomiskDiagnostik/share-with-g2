import type { ReaderState } from './readerState'

export function shouldUseInboxMenuStartup(
  status: ReaderState['status'],
  mode: 'menu' | 'reader',
): boolean {
  return mode === 'menu' && (status === 'ready' || status === 'empty')
}
