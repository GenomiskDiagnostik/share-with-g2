const STORAGE_KEY = 'send-to-g2.local-api-access-key'
const ACCESS_KEY_PATTERN = /^[A-Za-z0-9_-]{20,128}$/

export function normalizeAccessKey(value: string): string {
  return value.replace(/\s/g, '')
}

export function isValidAccessKey(value: string): boolean {
  return ACCESS_KEY_PATTERN.test(normalizeAccessKey(value))
}

export function loadAccessKey(storage: Storage = localStorage): string | undefined {
  try {
    const value = storage.getItem(STORAGE_KEY)
    return value && isValidAccessKey(value) ? normalizeAccessKey(value) : undefined
  } catch {
    return undefined
  }
}

export function saveAccessKey(
  value: string,
  storage: Storage = localStorage,
): boolean {
  const normalized = normalizeAccessKey(value)
  if (!isValidAccessKey(normalized)) return false
  try {
    storage.setItem(STORAGE_KEY, normalized)
    return true
  } catch {
    return false
  }
}

export function clearAccessKey(storage: Storage = localStorage) {
  try {
    storage.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable in a restricted WebView.
  }
}
