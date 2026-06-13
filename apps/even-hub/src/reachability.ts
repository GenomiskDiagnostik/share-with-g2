import {
  ApiStatusError,
  InvalidApiResponseError,
  LocalApiClient,
} from './api/localApiClient'

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

export function describeResult(result: ReachabilityResult): {
  heading: string
  summary: string
  glassText: string
} {
  if (result.state === 'connected') {
    const itemLabel = result.itemCount === 1 ? '1 element' : `${result.itemCount} elementer`
    return {
      heading: 'Lokal API fundet',
      summary: `${itemLabel} i indbakken. API ${result.version}.`,
      glassText: `Send to G2\n\nForbundet lokalt\n${itemLabel}\nAPI ${result.version}\n\nDobbelttryk for at lukke`,
    }
  }

  const explanation = {
    timeout: 'Forbindelsen fik ikke svar inden for tidsgrænsen.',
    http: `API'en svarede med HTTP ${result.detail ?? 'fejl'}.`,
    'invalid-response': 'API-svaret havde et ukendt format.',
    network: 'WebView’en kunne ikke nå 127.0.0.1:8765.',
  }[result.reason]

  return {
    heading: 'Ingen lokal forbindelse',
    summary: explanation,
    glassText: `Send to G2\n\nIngen lokal forbindelse\n${explanation}\n\nÅbn Android-appen og prøv igen.`,
  }
}
