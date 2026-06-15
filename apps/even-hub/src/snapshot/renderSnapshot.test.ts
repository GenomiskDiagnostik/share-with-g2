import { describe, expect, it } from 'vitest'
import { renderSnapshot, type SnapshotState } from './renderSnapshot'

describe('renderSnapshot', () => {
  it('renders localized loading and empty states', () => {
    expect(renderSnapshot({ status: 'loading' }, 'da').body).toContain('Henter')
    expect(renderSnapshot({ status: 'empty' }, 'en').body).toContain('Capture')
  })

  it('renders pairing on unauthorized errors', () => {
    const view = renderSnapshot(
      { status: 'error', reason: 'unauthorized' },
      'en',
    )

    expect(view.needsPairing).toBe(true)
    expect(view.heading).toContain('Pair')
  })

  it('renders ready snapshots as image data URLs', () => {
    const state: SnapshotState = {
      status: 'ready',
      snapshot: {
        id: 'shot',
        createdAt: 100,
        width: 288,
        height: 144,
        mimeType: 'image/png',
        imageBase64: 'abc123',
      },
    }

    const view = renderSnapshot(state, 'en')

    expect(view.meta).toBe('288×144 image')
    expect(view.imageSrc).toBe('data:image/png;base64,abc123')
    expect(view.glassText).toContain('Screen snapshot')
  })
})
