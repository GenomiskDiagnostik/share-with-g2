import { describe, expect, it } from 'vitest'
import {
  applyPins,
  loadPinnedIds,
  PINNED_ITEMS_KEY,
  savePinnedIds,
  setPinnedItemId,
} from './pinnedItems'
import type { SharedItem } from '../api/localApiClient'

describe('pinned items', () => {
  it('merges pinned ids from local storage, session storage, and cookies', () => {
    const local = memoryStorage({ [PINNED_ITEMS_KEY]: JSON.stringify(['one']) })
    const session = memoryStorage({ [PINNED_ITEMS_KEY]: JSON.stringify(['two']) })
    const ids = loadPinnedIds({
      local,
      session,
      cookie: `${PINNED_ITEMS_KEY}=${encodeURIComponent(JSON.stringify(['three']))}`,
      now: () => 10,
    })

    expect(Array.from(ids).sort()).toEqual(['one', 'three', 'two'])
    expect(local.getItem(PINNED_ITEMS_KEY)).toBe(JSON.stringify(['one', 'two', 'three']))
    expect(session.getItem(`${PINNED_ITEMS_KEY}.updatedAt`)).toBe('10')
  })

  it('toggles and applies pinned ids to shared items', () => {
    const local = memoryStorage()
    const storage = { local }

    setPinnedItemId('one', true, storage)
    setPinnedItemId('two', true, storage)
    setPinnedItemId('two', false, storage)

    expect(applyPins([item('one'), item('two')], storage)).toEqual([
      expect.objectContaining({ id: 'one', pinned: true }),
      expect.objectContaining({ id: 'two', pinned: false }),
    ])
  })

  it('writes cookie-compatible values', () => {
    const cookies: string[] = []
    savePinnedIds(['one'], { writeCookie: value => cookies.push(value) })

    expect(cookies[0]).toContain(`${PINNED_ITEMS_KEY}=`)
    expect(cookies[0]).toContain('max-age=31536000')
  })
})

function item(id: string): SharedItem {
  return {
    id,
    type: 'text',
    text: `Text ${id}`,
    createdAt: 100,
    read: false,
  }
}

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value)
    },
  }
}
