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
  readerTitle: string
  readerLoading: string
  readerEmpty: string
  readerFailure: Record<
    'unauthorized' | 'timeout' | 'http' | 'invalid-response' | 'network',
    string
  >
  pairingTitle: string
  pairingLabel: string
  pairingHelp: string
  pairingSave: string
  pairingInvalid: string
  openSettings: string
  settingsTitle: string
  settingsBack: string
  settingsKeyStatusSet: string
  settingsKeyStatusMissing: string
  settingsClearKey: string
  settingsKeyCleared: string
  readerMeta: (
    item: number,
    itemCount: number,
    page: number,
    pageCount: number,
    type: string,
  ) => string
  readerHelp: string
  itemPickerTitle: string
  menuHelp: string
  menuPrevious: string
  menuNext: string
  menuRetry: string
  glassesDeleteHelp: string
  inputDiagnostics: (count: number, kind: string, source: string) => string
  previousItem: string
  nextItem: string
  previousPage: string
  nextPage: string
  refresh: string
  deleteCurrent: string
  clearAll: string
  markRead: string
  markUnread: string
  readStateRead: string
  readStateUnread: string
  refreshSuccess: string
  refreshFailure: string
  readMutationFailure: string
  snapshotTitle: string
  snapshotLoading: string
  snapshotEmpty: string
  snapshotReady: string
  snapshotRefresh: string
  snapshotOpenSharing: string
  snapshotOpenInbox: string
  snapshotHelp: string
  snapshotImageAlt: string
  snapshotMeta: (width: number, height: number) => string
  mutationCancel: string
  mutationConfirmDelete: string
  mutationConfirmClear: string
  mutationDeleteTitle: string
  mutationDeleteBody: (title: string) => string
  mutationClearTitle: string
  mutationClearBody: string
  mutationWorking: string
  mutationFailure: string
  untitled: string
  typeText: string
  typeUrl: string
  demoMode: string
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
    failureNetwork: 'WebView’en kunne ikke nå localhost eller 127.0.0.1 på port 8765.',
    failedGlass: explanation =>
      `Send to G2\n\nIngen lokal forbindelse\n${explanation}\n\nÅbn Android-appen og prøv igen.`,
    readerTitle: 'Delt indbakke',
    readerLoading: 'Henter delte elementer...',
    readerEmpty: 'Ingen delte elementer endnu.',
    readerFailure: {
      unauthorized: 'Åbn Indstillinger og gem nøglen fra Android-appen.',
      timeout: 'Den lokale indbakke svarede ikke i tide.',
      http: 'Den lokale indbakke returnerede en HTTP-fejl.',
      'invalid-response': 'Den lokale indbakke returnerede ukendte data.',
      network: 'Kan ikke forbinde til telefonens lokale indbakke.',
    },
    pairingTitle: 'Par med Android-appen',
    pairingLabel: 'Adgangsnøgle',
    pairingHelp: 'Kopiér nøglen fra “Par Even Hub” i Android-appen.',
    pairingSave: 'Gem og forbind',
    pairingInvalid: 'Indtast en gyldig adgangsnøgle.',
    openSettings: 'Indstillinger',
    settingsTitle: 'Indstillinger',
    settingsBack: 'Tilbage',
    settingsKeyStatusSet: 'Der er gemt en adgangsnøgle på denne enhed.',
    settingsKeyStatusMissing: 'Der er ikke gemt en adgangsnøgle endnu.',
    settingsClearKey: 'Ryd gemt nøgle',
    settingsKeyCleared: 'Den gemte nøgle er ryddet.',
    readerMeta: (item, itemCount, page, pageCount, type) =>
      `${item}/${itemCount} · ${type} · side ${page}/${pageCount}`,
    readerHelp: 'Rul: side · Dobbelttryk: tilbage',
    itemPickerTitle: 'Vælg element',
    menuHelp: 'Rul: vælg · Tryk: åbn · Dobbelttryk: slet',
    menuPrevious: 'Forrige liste',
    menuNext: 'Næste liste',
    menuRetry: 'Indbakken er klar. Tryk for at åbne menuen.',
    glassesDeleteHelp: 'Tryk: slet · Dobbelttryk: annuller',
    inputDiagnostics: (count, kind, source) =>
      `R1-events: ${count} · seneste: ${kind} (${source})`,
    previousItem: 'Forrige element',
    nextItem: 'Næste element',
    previousPage: 'Forrige side',
    nextPage: 'Næste side',
    refresh: 'Opdatér',
    deleteCurrent: 'Slet element',
    clearAll: 'Ryd alt',
    markRead: 'Markér læst',
    markUnread: 'Markér ulæst',
    readStateRead: 'læst',
    readStateUnread: 'ulæst',
    refreshSuccess: 'Indbakken er opdateret.',
    refreshFailure: 'Indbakken kunne ikke opdateres lige nu.',
    readMutationFailure: 'Læst-status kunne ikke opdateres. Prøv igen.',
    snapshotTitle: 'Skærmdeling',
    snapshotLoading: 'Henter seneste skærmbillede...',
    snapshotEmpty: 'Start skærmdeling i Android-appen først.',
    snapshotReady: 'Skærmbilledet opdateres automatisk på brillerne.',
    snapshotRefresh: 'Opdatér nu',
    snapshotOpenSharing: 'Åbn skærmdeling',
    snapshotOpenInbox: 'Åbn indbakke',
    snapshotHelp: 'Start og stop delingen i Android-appen.',
    snapshotImageAlt: 'Seneste skærmbillede',
    snapshotMeta: (width, height) => `${width}×${height} billede`,
    mutationCancel: 'Annuller',
    mutationConfirmDelete: 'Slet element',
    mutationConfirmClear: 'Ryd indbakke',
    mutationDeleteTitle: 'Slet dette element?',
    mutationDeleteBody: title => `“${title}” slettes permanent fra telefonen.`,
    mutationClearTitle: 'Ryd hele indbakken?',
    mutationClearBody: 'Alle delte elementer slettes permanent fra telefonen.',
    mutationWorking: 'Arbejder…',
    mutationFailure: 'Handlingen kunne ikke gennemføres. Prøv igen.',
    untitled: 'Uden titel',
    typeText: 'Tekst',
    typeUrl: 'Link',
    demoMode: 'Demo-data',
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
    failureNetwork: 'The WebView could not reach localhost or 127.0.0.1 on port 8765.',
    failedGlass: explanation =>
      `Send to G2\n\nNo local connection\n${explanation}\n\nOpen the Android app and try again.`,
    readerTitle: 'Shared inbox',
    readerLoading: 'Loading shared items...',
    readerEmpty: 'No shared items yet.',
    readerFailure: {
      unauthorized: 'Open Settings and save the key from the Android app.',
      timeout: 'The local inbox did not respond before the timeout.',
      http: 'The local inbox returned an HTTP error.',
      'invalid-response': 'The local inbox returned unknown data.',
      network: 'Could not connect to the phone’s local inbox.',
    },
    pairingTitle: 'Pair with the Android app',
    pairingLabel: 'Access key',
    pairingHelp: 'Copy the key from “Pair Even Hub” in the Android app.',
    pairingSave: 'Save and connect',
    pairingInvalid: 'Enter a valid access key.',
    openSettings: 'Settings',
    settingsTitle: 'Settings',
    settingsBack: 'Back',
    settingsKeyStatusSet: 'An access key is saved on this device.',
    settingsKeyStatusMissing: 'No access key is saved yet.',
    settingsClearKey: 'Clear saved key',
    settingsKeyCleared: 'The saved key was cleared.',
    readerMeta: (item, itemCount, page, pageCount, type) =>
      `${item}/${itemCount} · ${type} · page ${page}/${pageCount}`,
    readerHelp: 'Scroll: page · Double-click: back',
    itemPickerTitle: 'Choose item',
    menuHelp: 'Scroll: select · Click: open · Double-click: delete',
    menuPrevious: 'Previous list',
    menuNext: 'Next list',
    menuRetry: 'The inbox is ready. Click to open the menu.',
    glassesDeleteHelp: 'Click: delete · Double-click: cancel',
    inputDiagnostics: (count, kind, source) =>
      `R1 events: ${count} · latest: ${kind} (${source})`,
    previousItem: 'Previous item',
    nextItem: 'Next item',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    refresh: 'Refresh',
    deleteCurrent: 'Delete item',
    clearAll: 'Clear all',
    markRead: 'Mark read',
    markUnread: 'Mark unread',
    readStateRead: 'read',
    readStateUnread: 'unread',
    refreshSuccess: 'Inbox refreshed.',
    refreshFailure: 'The inbox could not be refreshed right now.',
    readMutationFailure: 'Read status could not be updated. Try again.',
    snapshotTitle: 'Screen sharing',
    snapshotLoading: 'Loading latest screen snapshot...',
    snapshotEmpty: 'Start screen sharing in the Android app first.',
    snapshotReady: 'The screen image updates automatically on the glasses.',
    snapshotRefresh: 'Refresh now',
    snapshotOpenSharing: 'Open screen sharing',
    snapshotOpenInbox: 'Open inbox',
    snapshotHelp: 'Start and stop sharing in the Android app.',
    snapshotImageAlt: 'Latest screen snapshot',
    snapshotMeta: (width, height) => `${width}×${height} image`,
    mutationCancel: 'Cancel',
    mutationConfirmDelete: 'Delete item',
    mutationConfirmClear: 'Clear inbox',
    mutationDeleteTitle: 'Delete this item?',
    mutationDeleteBody: title => `“${title}” will be permanently deleted from the phone.`,
    mutationClearTitle: 'Clear the entire inbox?',
    mutationClearBody: 'All shared items will be permanently deleted from the phone.',
    mutationWorking: 'Working…',
    mutationFailure: 'The action could not be completed. Try again.',
    untitled: 'Untitled',
    typeText: 'Text',
    typeUrl: 'Link',
    demoMode: 'Demo data',
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
