import type { SharedItem } from '../api/localApiClient'

export const PINNED_ITEMS_KEY = 'sendToG2.pinnedItemIds'

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>

export type PinnedStorage = {
  local?: StorageLike
  session?: StorageLike
  cookie?: string
  writeCookie?: (value: string) => void
  now?: () => number
}

export function loadPinnedIds(storage: PinnedStorage = browserStorage()): Set<string> {
  const ids = new Set<string>()
  for (const value of [
    safeGet(storage.local),
    safeGet(storage.session),
    readCookieValue(storage.cookie),
  ]) {
    for (const id of decodePinnedIds(value)) ids.add(id)
  }
  savePinnedIds(ids, storage)
  return ids
}

export function savePinnedIds(
  ids: Iterable<string>,
  storage: PinnedStorage = browserStorage(),
): Set<string> {
  const clean = new Set(
    Array.from(ids).filter(id => typeof id === 'string' && id.length > 0),
  )
  const value = JSON.stringify(Array.from(clean))
  const updatedAt = String((storage.now ?? Date.now)())
  safeSet(storage.local, PINNED_ITEMS_KEY, value)
  safeSet(storage.local, `${PINNED_ITEMS_KEY}.updatedAt`, updatedAt)
  safeSet(storage.session, PINNED_ITEMS_KEY, value)
  safeSet(storage.session, `${PINNED_ITEMS_KEY}.updatedAt`, updatedAt)
  try {
    storage.writeCookie?.(`${PINNED_ITEMS_KEY}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`)
  } catch {
    // Some WebView cookie implementations are read-only.
  }
  return clean
}

export function isPinnedItem(item: SharedItem | undefined): boolean {
  return item?.pinned === true
}

export function setPinnedItemId(
  id: string,
  pinned: boolean,
  storage: PinnedStorage = browserStorage(),
): Set<string> {
  const ids = loadPinnedIds(storage)
  if (pinned) ids.add(id)
  else ids.delete(id)
  return savePinnedIds(ids, storage)
}

export function applyPins(
  items: readonly SharedItem[],
  storage: PinnedStorage = browserStorage(),
): SharedItem[] {
  const ids = loadPinnedIds(storage)
  return items.map(item => ({ ...item, pinned: ids.has(item.id) }))
}

function decodePinnedIds(value: string | null | undefined): string[] {
  try {
    const parsed: unknown = JSON.parse(String(value || '[]'))
    return Array.isArray(parsed)
      ? parsed.filter(id => typeof id === 'string' && id.length > 0)
      : []
  } catch {
    return []
  }
}

function safeGet(storage: StorageLike | undefined): string | null {
  try {
    return storage?.getItem(PINNED_ITEMS_KEY) ?? null
  } catch {
    return null
  }
}

function safeSet(
  storage: StorageLike | undefined,
  key: string,
  value: string,
) {
  try {
    storage?.setItem(key, value)
  } catch {
    // Storage may be unavailable in restricted WebViews.
  }
}

function readCookieValue(cookie: string | undefined): string | null {
  const match = cookie
    ?.split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${PINNED_ITEMS_KEY}=`))
  if (!match) return null
  return decodeURIComponent(match.substring(PINNED_ITEMS_KEY.length + 1))
}

function browserStorage(): PinnedStorage {
  return {
    local: typeof localStorage === 'undefined' ? undefined : localStorage,
    session: typeof sessionStorage === 'undefined' ? undefined : sessionStorage,
    cookie: typeof document === 'undefined' ? undefined : document.cookie,
    writeCookie: value => {
      document.cookie = value
    },
  }
}
