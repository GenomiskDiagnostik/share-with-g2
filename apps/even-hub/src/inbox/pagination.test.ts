import { describe, expect, it } from 'vitest'
import { paginateText } from './pagination'

describe('paginateText', () => {
  it('keeps short text on one page', () => {
    expect(paginateText('Short text', 20)).toEqual(['Short text'])
  })

  it('prefers word boundaries and preserves all content', () => {
    const pages = paginateText('alpha beta gamma delta epsilon', 12)

    expect(pages).toEqual(['alpha beta', 'gamma delta', 'epsilon'])
    expect(pages.join(' ')).toBe('alpha beta gamma delta epsilon')
  })

  it('prefers paragraph boundaries for readable pages', () => {
    const pages = paginateText('First paragraph.\n\nSecond paragraph.', 20)

    expect(pages).toEqual(['First paragraph.', 'Second paragraph.'])
  })

  it('hard-splits a token longer than the page limit', () => {
    expect(paginateText('abcdefghij', 4)).toEqual(['abcd', 'efgh', 'ij'])
  })
})
