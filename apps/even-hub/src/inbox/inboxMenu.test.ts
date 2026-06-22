import { describe, expect, it } from 'vitest'
import type { SharedItem } from '../api/localApiClient'
import { buildInboxMenu, findInboxMenuEntry } from './inboxMenu'

const labels = {
  untitled: 'Untitled',
  unread: 'New',
  read: 'Read',
  previous: 'Previous list',
  next: 'Next list',
  screenSharing: 'Screen sharing',
}

describe('inbox menu', () => {
  it('creates visible, uniquely numbered item labels', () => {
    const page = buildInboxMenu([
      item('one', 'Same title', false),
      item('two', 'Same title', true),
    ], 0, labels)

    expect(page.entries.map(entry => entry.label)).toEqual([
      'Screen sharing',
      '1. [New] Same title',
      '2. [Read] Same title',
    ])
    expect(findInboxMenuEntry(page, page.entries[2]?.label)).toMatchObject({
      kind: 'item',
      itemIndex: 1,
    })
  })

  it('keeps every native list at or below twenty entries', () => {
    const items = Array.from({ length: 40 }, (_, index) => item(String(index)))
    const first = buildInboxMenu(items, 0, labels)
    const middle = buildInboxMenu(items, 1, labels)
    const last = buildInboxMenu(items, 2, labels)

    expect(first.entries).toHaveLength(19)
    expect(middle.entries).toHaveLength(20)
    expect(last.entries).toHaveLength(8)
    expect(middle.entries[0]?.kind).toBe('screen-sharing')
    expect(middle.entries[1]?.kind).toBe('previous-page')
    expect(middle.entries.at(-1)?.kind).toBe('next-page')
  })

  it('clamps stale menu page indexes after refresh', () => {
    const page = buildInboxMenu([item('one')], 9, labels)

    expect(page).toMatchObject({ pageIndex: 0, pageCount: 1 })
  })

  it('resolves the current entry by index when a click omits its name', () => {
    const page = buildInboxMenu([item('one'), item('two')], 0, labels)

    expect(findInboxMenuEntry(page, undefined, 2)).toMatchObject({
      kind: 'item',
      itemIndex: 1,
    })
  })

  it('bounds item labels to the SDK limit', () => {
    const page = buildInboxMenu([item('one', 'x'.repeat(100))], 0, labels)

    expect(page.entries[1]?.label.length).toBeLessThanOrEqual(64)
  })
})

function item(id: string, title = `Item ${id}`, read = false): SharedItem {
  return {
    id,
    type: 'text',
    title,
    text: `Text ${id}`,
    createdAt: 100,
    read,
  }
}
