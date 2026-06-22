import { describe, expect, it } from 'vitest'
import { getStrings, resolveLocale } from './strings'

describe('Even Hub locale selection', () => {
  it('uses Danish for Danish regional locales', () => {
    expect(resolveLocale(['da-DK', 'en-US'])).toBe('da')
    expect(getStrings('da').retry).toBe('Prøv igen')
    expect(getStrings('da').menuHelp).toContain('Tryk: åbn')
    expect(getStrings('da').menuHelp).toContain('Dobbelttryk: slet')
  })

  it('uses English as the fallback for unsupported locales', () => {
    expect(resolveLocale(['de-DE'])).toBe('en')
    expect(getStrings('en').retry).toBe('Try again')
    expect(getStrings('en').readerHelp).toContain('Double-click: back')
  })
})
