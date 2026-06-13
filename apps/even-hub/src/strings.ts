export type SupportedLocale = 'da' | 'en'

export type AppStrings = {
  probeEyebrow: string
  endpoint: string
  transport: string
  transportValue: string
  access: string
  accessValue: string
  retry: string
  connectedHeading: string
  connectedSummary: (itemCount: number, version: string) => string
  connectedGlass: (itemCount: number, version: string) => string
  failedHeading: string
  failureTimeout: string
  failureHttp: (detail?: string) => string
  failureInvalidResponse: string
  failureNetwork: string
  failedGlass: (explanation: string) => string
}

const strings: Record<SupportedLocale, AppStrings> = {
  da: {
    probeEyebrow: 'M2 · forbindelsestest',
    endpoint: 'Endpoint',
    transport: 'Transport',
    transportValue: 'Kun lokal HTTP',
    access: 'Adgang',
    accessValue: 'Læsning uden cloud',
    retry: 'Prøv igen',
    connectedHeading: 'Lokal API fundet',
    connectedSummary: (itemCount, version) =>
      `${danishItemCount(itemCount)} i indbakken. API ${version}.`,
    connectedGlass: (itemCount, version) =>
      `Send to G2\n\nForbundet lokalt\n${danishItemCount(itemCount)}\nAPI ${version}\n\nDobbelttryk for at lukke`,
    failedHeading: 'Ingen lokal forbindelse',
    failureTimeout: 'Forbindelsen fik ikke svar inden for tidsgrænsen.',
    failureHttp: detail => `API'en svarede med HTTP ${detail ?? 'fejl'}.`,
    failureInvalidResponse: 'API-svaret havde et ukendt format.',
    failureNetwork: 'WebView’en kunne ikke nå 127.0.0.1:8765.',
    failedGlass: explanation =>
      `Send to G2\n\nIngen lokal forbindelse\n${explanation}\n\nÅbn Android-appen og prøv igen.`,
  },
  en: {
    probeEyebrow: 'M2 · connection test',
    endpoint: 'Endpoint',
    transport: 'Transport',
    transportValue: 'Local HTTP only',
    access: 'Access',
    accessValue: 'Read-only without cloud',
    retry: 'Try again',
    connectedHeading: 'Local API found',
    connectedSummary: (itemCount, version) =>
      `${englishItemCount(itemCount)} in the inbox. API ${version}.`,
    connectedGlass: (itemCount, version) =>
      `Send to G2\n\nConnected locally\n${englishItemCount(itemCount)}\nAPI ${version}\n\nDouble-tap to close`,
    failedHeading: 'No local connection',
    failureTimeout: 'The connection did not respond before the timeout.',
    failureHttp: detail => `The API returned HTTP ${detail ?? 'error'}.`,
    failureInvalidResponse: 'The API returned an unknown response format.',
    failureNetwork: 'The WebView could not reach 127.0.0.1:8765.',
    failedGlass: explanation =>
      `Send to G2\n\nNo local connection\n${explanation}\n\nOpen the Android app and try again.`,
  },
}

export function resolveLocale(languages: readonly string[]): SupportedLocale {
  return languages.some(language => language.toLowerCase().split('-')[0] === 'da')
    ? 'da'
    : 'en'
}

export function getStrings(locale: SupportedLocale): AppStrings {
  return strings[locale]
}

function danishItemCount(count: number): string {
  return count === 1 ? '1 element' : `${count} elementer`
}

function englishItemCount(count: number): string {
  return count === 1 ? '1 item' : `${count} items`
}
