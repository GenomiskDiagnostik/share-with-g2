import { describe, expect, it } from 'vitest'
import { shouldUseInboxMenuStartup } from './inboxStartup'

describe('inbox startup surface', () => {
  it('starts directly with the native menu after a ready or empty load', () => {
    expect(shouldUseInboxMenuStartup('ready', 'menu')).toBe(true)
    expect(shouldUseInboxMenuStartup('empty', 'menu')).toBe(true)
  })

  it('keeps genuine loading and failure states in a text container', () => {
    expect(shouldUseInboxMenuStartup('loading', 'menu')).toBe(false)
    expect(shouldUseInboxMenuStartup('error', 'menu')).toBe(false)
  })

  it('honors a phone-side reader selection made before bridge startup', () => {
    expect(shouldUseInboxMenuStartup('ready', 'reader')).toBe(false)
  })
})
