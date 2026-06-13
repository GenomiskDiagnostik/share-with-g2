import { describe, expect, it } from 'vitest'
import { getStrings, resolveLocale } from './strings'

describe('Even Hub locale selection', () => {
  it('uses Danish for Danish regional locales', () => {
    expect(resolveLocale(['da-DK', 'en-US'])).toBe('da')
    expect(getStrings('da').retry).toBe('Prøv igen')
  })

  it('uses English as the fallback for unsupported locales', () => {
    expect(resolveLocale(['de-DE'])).toBe('en')
    expect(getStrings('en').retry).toBe('Try again')
  })
})
