import { describe, expect, it } from 'vitest'
import type { SharedItem } from '../api/localApiClient'
import { getCurrentItem, reduceReader, type ReaderState } from './readerState'

describe('reader state', () => {
  it('maps an empty load to the empty state', () => {
    expect(reduceReader({ status: 'loading' }, { type: 'load', items: [] }))
      .toEqual({ status: 'empty' })
  })

  it('loads newest-first items at the first page', () => {
    const state = reduceReader(
      { status: 'loading' },
      { type: 'load', items: [item('new'), item('old')] },
    )

    expect(state).toMatchObject({
      status: 'ready',
      selectedIndex: 0,
      pageIndex: 0,
    })
    expect(getCurrentItem(state)?.id).toBe('new')
  })

  it('wraps item navigation and resets the page', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('one'), item('two')],
      selectedIndex: 1,
      pageIndex: 1,
    }

    const next = reduceReader(state, { type: 'next-item' })
    expect(next).toMatchObject({ selectedIndex: 0, pageIndex: 0 })

    const previous = reduceReader(next, { type: 'previous-item' })
    expect(previous).toMatchObject({ selectedIndex: 1, pageIndex: 0 })
  })

  it('clamps page navigation at both ends', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('long', 'word '.repeat(400))],
      selectedIndex: 0,
      pageIndex: 0,
    }

    const previous = reduceReader(state, { type: 'previous-page' })
    expect(previous).toMatchObject({ pageIndex: 0 })

    let next: ReaderState = state
    for (let index = 0; index < 20; index += 1) {
      next = reduceReader(next, { type: 'next-page' })
    }
    expect(next).toMatchObject({ pageIndex: 2 })
  })

  it('deletes the current item and keeps a valid selection', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('one'), item('two'), item('three')],
      selectedIndex: 2,
      pageIndex: 1,
    }

    const next = reduceReader(state, { type: 'delete-current' })

    expect(next).toMatchObject({ selectedIndex: 1, pageIndex: 0 })
    expect(getCurrentItem(next)?.id).toBe('two')
  })

  it('maps deleting the final item and clearing to empty', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('one')],
      selectedIndex: 0,
      pageIndex: 0,
    }

    expect(reduceReader(state, { type: 'delete-current' }))
      .toEqual({ status: 'empty' })
    expect(reduceReader(state, { type: 'clear' }))
      .toEqual({ status: 'empty' })
  })

  it('refreshes items while preserving the current item and page when possible', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('one'), item('two', 'word '.repeat(400))],
      selectedIndex: 1,
      pageIndex: 1,
    }

    const next = reduceReader(state, {
      type: 'refresh',
      items: [item('new'), item('two', 'word '.repeat(400)), item('one')],
    })

    expect(next).toMatchObject({ selectedIndex: 1, pageIndex: 1 })
    expect(getCurrentItem(next)?.id).toBe('two')
  })

  it('refresh resets to a valid item when the current item disappeared', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('one'), item('two')],
      selectedIndex: 1,
      pageIndex: 1,
    }

    const next = reduceReader(state, {
      type: 'refresh',
      items: [item('new')],
    })

    expect(next).toMatchObject({ selectedIndex: 0, pageIndex: 0 })
    expect(getCurrentItem(next)?.id).toBe('new')
  })

  it('updates read state on the selected item only', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [item('one'), item('two')],
      selectedIndex: 1,
      pageIndex: 0,
    }

    const next = reduceReader(state, {
      type: 'update-current-read',
      read: true,
    })

    expect(next.status).toBe('ready')
    if (next.status !== 'ready') return
    expect(next.items.map(value => value.read)).toEqual([false, true])
  })
})

function item(id: string, text = `Text for ${id}`): SharedItem {
  return {
    id,
    type: 'text',
    text,
    createdAt: 100,
    read: false,
  }
}
