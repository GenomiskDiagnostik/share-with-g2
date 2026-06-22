export const DEFAULT_REBUILD_DELAYS_MS = [0, 400, 800] as const

export async function rebuildWithRetry(
  rebuild: () => Promise<boolean>,
  delaysMs: readonly number[] = DEFAULT_REBUILD_DELAYS_MS,
  wait: (milliseconds: number) => Promise<void> = delay,
): Promise<boolean> {
  for (const milliseconds of delaysMs) {
    if (milliseconds > 0) await wait(milliseconds)
    try {
      if (await rebuild()) return true
    } catch {
      // A transient bridge rejection is handled like a false rebuild result.
    }
  }
  return false
}

function delay(milliseconds: number): Promise<void> {
  return new Promise(resolve => globalThis.setTimeout(resolve, milliseconds))
}
