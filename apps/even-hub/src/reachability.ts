import {
  ApiStatusError,
  InvalidApiResponseError,
  LocalApiClient,
} from './api/localApiClient'
import { getStrings, type SupportedLocale } from './strings'

export type ReachabilityResult =
  | {
      state: 'connected'
      version: string
      itemCount: number
    }
  | {
      state: 'failed'
      reason: 'timeout' | 'http' | 'invalid-response' | 'network'
      detail?: string
    }

export type LocalApiReader = Pick<LocalApiClient, 'health' | 'items'>

export async function probeLocalApi(
  client: LocalApiReader = new LocalApiClient(),
): Promise<ReachabilityResult> {
  try {
    const health = await client.health()
    const items = await client.items()
    return {
      state: 'connected',
      version: health.version,
      itemCount: items.length,
    }
  } catch (error) {
    if (error instanceof ApiStatusError) {
      return { state: 'failed', reason: 'http', detail: String(error.status) }
    }
    if (error instanceof InvalidApiResponseError) {
      return { state: 'failed', reason: 'invalid-response' }
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { state: 'failed', reason: 'timeout' }
    }
    return { state: 'failed', reason: 'network' }
  }
}

export function describeResult(
  result: ReachabilityResult,
  locale: SupportedLocale = 'en',
): {
  heading: string
  summary: string
  glassText: string
} {
  const copy = getStrings(locale)
  if (result.state === 'connected') {
    return {
      heading: copy.connectedHeading,
      summary: copy.connectedSummary(result.itemCount, result.version),
      glassText: copy.connectedGlass(result.itemCount, result.version),
    }
  }

  const explanation = {
    timeout: copy.failureTimeout,
    http: copy.failureHttp(result.detail),
    'invalid-response': copy.failureInvalidResponse,
    network: copy.failureNetwork,
  }[result.reason]

  return {
    heading: copy.failedHeading,
    summary: explanation,
    glassText: copy.failedGlass(explanation),
  }
}
