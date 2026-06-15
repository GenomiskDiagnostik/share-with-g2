import { describe, expect, it } from 'vitest'
import type { ReaderState } from './readerState'
import { renderReader } from './renderReader'

describe('renderReader', () => {
  it('renders localized loading, empty, and error states', () => {
    expect(renderReader({ status: 'loading' }, 'da').body).toContain('Henter')
    expect(renderReader({ status: 'empty' }, 'en').body).toBe('No shared items yet.')
    expect(
      renderReader({ status: 'error', reason: 'network' }, 'da').body,
    ).toContain('lokale indbakke')
    const unauthorized = renderReader(
      { status: 'error', reason: 'unauthorized' },
      'da',
    )
    expect(unauthorized.needsPairing).toBe(true)
    expect(unauthorized.heading).toContain('Par')
  })

  it('renders item, type, and page metadata', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [
        {
          id: 'url',
          type: 'url',
          title: 'Example',
          text: 'https://example.com',
          createdAt: 100,
          read: false,
        },
      ],
      selectedIndex: 0,
      pageIndex: 0,
    }

    const view = renderReader(state, 'en')
    expect(view.heading).toBe('Example')
    expect(view.meta).toBe('1/1 · Link - unread · page 1/1')
    expect(view.body).toBe('https://example.com')
  })

  it('keeps G2 content within the startup text limit', () => {
    const state: ReaderState = {
      status: 'ready',
      items: [
        {
          id: 'long',
          type: 'text',
          title: 'A'.repeat(500),
          text: 'body '.repeat(200),
          createdAt: 100,
          read: false,
        },
      ],
      selectedIndex: 0,
      pageIndex: 0,
    }

    expect(renderReader(state, 'en').glassText.length).toBeLessThanOrEqual(1_000)
  })
})
