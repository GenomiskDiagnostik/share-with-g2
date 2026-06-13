import { describe, expect, it } from 'vitest'
import {
  clearAccessKey,
  isValidAccessKey,
  loadAccessKey,
  normalizeAccessKey,
  saveAccessKey,
} from './accessKey'

describe('access key storage', () => {
  it('normalizes grouped base64url keys', () => {
    expect(normalizeAccessKey('abcd efgh\nijkl')).toBe('abcdefghijkl')
  })

  it('accepts only bounded base64url values', () => {
    expect(isValidAccessKey('a'.repeat(32))).toBe(true)
    expect(isValidAccessKey('a'.repeat(19))).toBe(false)
    expect(isValidAccessKey('a'.repeat(129))).toBe(false)
    expect(isValidAccessKey('a'.repeat(31) + '=')).toBe(false)
  })

  it('saves, loads, and clears without exposing the storage key', () => {
    const storage = memoryStorage()
    const key = 'abcdEFGHijklMNOPqrstUVWXyz01_-23'

    expect(saveAccessKey(key, storage)).toBe(true)
    expect(loadAccessKey(storage)).toBe(key)
    clearAccessKey(storage)
    expect(loadAccessKey(storage)).toBeUndefined()
  })
})

function memoryStorage(): Storage {
  const values = new Map<string, string>()
  return {
    get length() {
      return values.size
    },
    clear: () => values.clear(),
    getItem: key => values.get(key) ?? null,
    key: index => [...values.keys()][index] ?? null,
    removeItem: key => {
      values.delete(key)
    },
    setItem: (key, value) => {
      values.set(key, value)
    },
  }
}
