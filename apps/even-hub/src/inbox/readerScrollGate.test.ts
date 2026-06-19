import { describe, expect, it } from 'vitest'
import { ReaderScrollGate } from './readerScrollGate'

describe('ReaderScrollGate', () => {
  it('does not update an unchanged first or final page', () => {
    const gate = new ReaderScrollGate()

    expect(gate.actionFor('top', 0, 3, 1_000)).toBeUndefined()
    expect(gate.actionFor('bottom', 2, 3, 1_000)).toBeUndefined()
  })

  it('suppresses immediate bounce and duplicate events after a page change', () => {
    const gate = new ReaderScrollGate(800)

    expect(gate.actionFor('bottom', 0, 3, 1_000)).toBe('next-page')
    expect(gate.actionFor('top', 1, 3, 1_050)).toBeUndefined()
    expect(gate.actionFor('bottom', 1, 3, 1_100)).toBeUndefined()
    expect(gate.actionFor('top', 1, 3, 1_801)).toBe('previous-page')
  })

  it('allows deliberate page movement after the cooldown', () => {
    const gate = new ReaderScrollGate(500)

    expect(gate.actionFor('bottom', 0, 4, 100)).toBe('next-page')
    expect(gate.actionFor('bottom', 1, 4, 601)).toBe('next-page')
  })
})
