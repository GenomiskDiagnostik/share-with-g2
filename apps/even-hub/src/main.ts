import {
  CreateStartUpPageContainer,
  ImageContainerProperty,
  ImageRawDataUpdate,
  ImageRawDataUpdateResult,
  OsEventTypeList,
  TextContainerProperty,
  TextContainerUpgrade,
  waitForEvenAppBridge,
} from '@evenrealities/even_hub_sdk'
import {
  ApiStatusError,
  InvalidApiResponseError,
  LocalApiClient,
  type ScreenSnapshot,
} from './api/localApiClient'
import { clearAccessKey, loadAccessKey, saveAccessKey } from './auth/accessKey'
import {
  getCurrentItem,
  reduceReader,
  type ReaderAction,
  type ReaderNavigationAction,
  type ReaderFailureReason,
  type ReaderState,
} from './inbox/readerState'
import { DEMO_ITEMS, renderReader, type ReaderView } from './inbox/renderReader'
import { renderSnapshot, type SnapshotState, type SnapshotView } from './snapshot/renderSnapshot'
import { getStrings, resolveLocale } from './strings'
import './style.css'

const CONTAINER_ID = 1
const CONTAINER_NAME = 'sharedInbox'
const SNAPSHOT_TEXT_CONTAINER_ID = 2
const SNAPSHOT_TEXT_CONTAINER_NAME = 'snapshotText'
const SNAPSHOT_IMAGE_CONTAINER_ID = 3
const SNAPSHOT_IMAGE_CONTAINER_NAME = 'snapshotImage'
const REFRESH_INTERVAL_MS = 10_000
type MutationAction = 'delete-current' | 'clear'

async function main() {
  const root = document.querySelector<HTMLElement>('#app')
  if (!root) throw new Error('Missing #app root')

  const locale = resolveLocale(navigator.languages)
  const strings = getStrings(locale)
  const params = new URLSearchParams(window.location.search)
  const demoMode = params.get('demo') === '1'
  document.documentElement.lang = locale
  if (params.get('settings') === '1') {
    runSettingsMode(root, strings)
    return
  }
  if (params.get('mode') === 'snapshot') {
    await runScreenSnapshotMode(root, locale, strings, demoMode)
    return
  }

  let state: ReaderState = { status: 'loading' }
  let bridge: Awaited<ReturnType<typeof waitForEvenAppBridge>> | undefined
  let client: LocalApiClient | undefined

  const render = async () => {
    const view = renderReader(state, locale)
    renderWeb(root, view, strings, demoMode ? strings.demoMode : undefined)
    if (bridge) {
      await bridge.textContainerUpgrade(
        new TextContainerUpgrade({
          containerID: CONTAINER_ID,
          containerName: CONTAINER_NAME,
          contentOffset: 0,
          contentLength: view.glassText.length,
          content: view.glassText,
        }),
      )
    }
  }

  const dispatch = async (action: ReaderAction) => {
    state = reduceReader(state, action)
    await render()
  }

  const mutate = async (
    action: MutationAction,
  ): Promise<ReaderFailureReason | undefined> => {
    if (state.status !== 'ready') return undefined
    const currentItem = getCurrentItem(state)
    if (!currentItem) return undefined
    try {
      if (!demoMode) {
        if (!client) return 'network'
        if (action === 'delete-current') {
          await client.deleteItem(currentItem.id)
        } else {
          await client.clearItems()
        }
      }
      await dispatch({ type: action })
      return undefined
    } catch (error) {
      return classifyFailure(error)
    }
  }

  const refreshItems = async (manual: boolean) => {
    if (demoMode) {
      await dispatch({ type: 'refresh', items: DEMO_ITEMS })
      if (manual) setText(root, '#mutation-status', strings.refreshSuccess)
      return
    }
    if (!client) return
    try {
      await dispatch({ type: 'refresh', items: await client.items() })
      if (manual) setText(root, '#mutation-status', strings.refreshSuccess)
    } catch (error) {
      const failure = classifyFailure(error)
      if (failure === 'unauthorized') {
        await dispatch({ type: 'fail', reason: failure })
      } else if (manual) {
        setText(root, '#mutation-status', strings.refreshFailure)
      }
    }
  }

  const updateCurrentRead = async () => {
    if (state.status !== 'ready') return
    const currentItem = getCurrentItem(state)
    if (!currentItem) return
    const read = !currentItem.read
    try {
      if (!demoMode) {
        if (!client) throw new Error('Missing local API client')
        await client.updateRead(currentItem.id, read)
      }
      await dispatch({ type: 'update-current-read', read })
    } catch (error) {
      const failure = classifyFailure(error)
      if (failure === 'unauthorized') {
        await dispatch({ type: 'fail', reason: failure })
      } else {
        setText(root, '#mutation-status', strings.readMutationFailure)
      }
    }
  }

  bindWebActions(
    root,
    dispatch,
    strings,
    () => state,
    mutate,
    () => refreshItems(true),
    updateCurrentRead,
  )
  renderWeb(
    root,
    renderReader(state, locale),
    strings,
    demoMode ? strings.demoMode : undefined,
  )

  try {
    bridge = await waitForEvenAppBridge()
    const initialView = renderReader(state, locale)
    await bridge.createStartUpPageContainer(
      new CreateStartUpPageContainer({
        containerTotalNum: 1,
        textObject: [
          new TextContainerProperty({
            xPosition: 0,
            yPosition: 0,
            width: 576,
            height: 288,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 8,
            containerID: CONTAINER_ID,
            containerName: CONTAINER_NAME,
            content: initialView.glassText,
            isEventCapture: 1,
          }),
        ],
      }),
    )
    bindBridgeActions(bridge, dispatch)
  } catch {
    root.dataset.bridge = 'unavailable'
  }

  if (demoMode) {
    await dispatch({ type: 'load', items: DEMO_ITEMS })
    return
  }

  client = new LocalApiClient(
    undefined,
    undefined,
    undefined,
    loadAccessKey(),
  )
  try {
    await client.health()
    await dispatch({ type: 'load', items: await client.items() })
    window.setInterval(() => {
      void refreshItems(false)
    }, REFRESH_INTERVAL_MS)
  } catch (error) {
    await dispatch({ type: 'fail', reason: classifyFailure(error) })
  }
}

async function runScreenSnapshotMode(
  root: HTMLElement,
  locale: ReturnType<typeof resolveLocale>,
  strings: ReturnType<typeof getStrings>,
  demoMode: boolean,
) {
  let state: SnapshotState = { status: 'loading' }
  let bridge: Awaited<ReturnType<typeof waitForEvenAppBridge>> | undefined
  let bridgeReady = false
  let client: LocalApiClient | undefined

  const render = async () => {
    const view = renderSnapshot(state, locale)
    renderSnapshotWeb(root, view, strings, demoMode ? strings.demoMode : undefined)
    if (bridge && bridgeReady) {
      await bridge.textContainerUpgrade(
        new TextContainerUpgrade({
          containerID: SNAPSHOT_TEXT_CONTAINER_ID,
          containerName: SNAPSHOT_TEXT_CONTAINER_NAME,
          contentOffset: 0,
          contentLength: view.glassText.length,
          content: view.glassText,
        }),
      )
      await updateSnapshotImage(bridge, state)
    }
  }

  const setState = async (next: SnapshotState) => {
    state = next
    await render()
  }

  const loadSnapshot = async (manual: boolean) => {
    try {
      if (demoMode) {
        await setState({ status: 'ready', snapshot: DEMO_SNAPSHOT })
        return
      }
      if (!client) return
      await setState({ status: 'ready', snapshot: await client.screenSnapshot() })
    } catch (error) {
      if (error instanceof ApiStatusError && error.status === 404) {
        await setState({ status: 'empty' })
        return
      }
      await setState({ status: 'error', reason: classifyFailure(error) })
    } finally {
      if (manual) {
        const refresh = root.querySelector<HTMLButtonElement>('[data-refresh-snapshot]')
        if (refresh) {
          refresh.disabled = false
          refresh.textContent = strings.snapshotRefresh
        }
      }
    }
  }

  bindSnapshotWebActions(root, strings, () => loadSnapshot(true), demoMode)
  renderSnapshotWeb(
    root,
    renderSnapshot(state, locale),
    strings,
    demoMode ? strings.demoMode : undefined,
  )

  try {
    bridge = await waitForEvenAppBridge()
    const view = renderSnapshot(state, locale)
    await bridge.createStartUpPageContainer(
      new CreateStartUpPageContainer({
        containerTotalNum: 2,
        imageObject: [
          new ImageContainerProperty({
            xPosition: 144,
            yPosition: 8,
            width: 288,
            height: 144,
            containerID: SNAPSHOT_IMAGE_CONTAINER_ID,
            containerName: SNAPSHOT_IMAGE_CONTAINER_NAME,
          }),
        ],
        textObject: [
          new TextContainerProperty({
            xPosition: 0,
            yPosition: 164,
            width: 576,
            height: 124,
            borderWidth: 0,
            borderColor: 5,
            paddingLength: 8,
            containerID: SNAPSHOT_TEXT_CONTAINER_ID,
            containerName: SNAPSHOT_TEXT_CONTAINER_NAME,
            content: view.glassText,
            isEventCapture: 1,
          }),
        ],
      }),
    )
    bridgeReady = true
    bindBridgeActions(bridge, async action => {
      if (action.type === 'next-item') {
        await loadSnapshot(true)
      }
    })
  } catch {
    root.dataset.bridge = 'unavailable'
  }

  if (demoMode) {
    await loadSnapshot(false)
    return
  }

  client = new LocalApiClient(
    undefined,
    undefined,
    undefined,
    loadAccessKey(),
  )
  try {
    await client.health()
    await loadSnapshot(false)
    window.setInterval(() => {
      void loadSnapshot(false)
    }, REFRESH_INTERVAL_MS)
  } catch (error) {
    await setState({ status: 'error', reason: classifyFailure(error) })
  }
}

function renderSnapshotWeb(
  root: HTMLElement,
  view: SnapshotView,
  strings: ReturnType<typeof getStrings>,
  badge?: string,
) {
  root.innerHTML = `
    <section class="reader-card snapshot-card" data-state="${view.status}">
      <div class="reader-topline">
        <p class="eyebrow">${strings.snapshotTitle}</p>
        <div class="top-actions">
          <span class="mode-badge" id="mode-badge" hidden></span>
          <button type="button" class="settings-button" data-open-settings aria-label="${strings.openSettings}" title="${strings.openSettings}">⚙</button>
        </div>
      </div>
      <p class="reader-meta">${view.meta}</p>
      <h1>${view.heading}</h1>
      <p class="summary">${view.body}</p>
      <div class="snapshot-preview" id="snapshot-preview"></div>
      <p class="reader-help">${view.help}</p>
      <form class="pairing-form" data-pairing-form hidden>
        <label for="access-key">${strings.pairingLabel}</label>
        <input
          id="access-key"
          name="access-key"
          type="text"
          inputmode="text"
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          required
        >
        <p>${strings.pairingHelp}</p>
        <button type="submit">${strings.pairingSave}</button>
      </form>
      <div class="reader-actions">
        <button type="button" data-refresh-snapshot>${strings.snapshotRefresh}</button>
        <button type="button" data-open-inbox>${strings.snapshotOpenInbox}</button>
        <button type="button" data-reload hidden>${strings.retry}</button>
      </div>
    </section>
  `

  const preview = root.querySelector<HTMLElement>('#snapshot-preview')
  if (preview && view.imageSrc) {
    const image = document.createElement('img')
    image.src = view.imageSrc
    image.alt = view.imageAlt
    preview.append(image)
  }

  const pairingForm = root.querySelector<HTMLFormElement>('[data-pairing-form]')
  if (pairingForm) pairingForm.hidden = !shouldShowPairingForm(view.needsPairing)
  const retryButton = root.querySelector<HTMLButtonElement>('[data-reload]')
  if (retryButton) {
    retryButton.hidden = view.status !== 'error' || view.needsPairing
  }

  const badgeElement = root.querySelector<HTMLElement>('#mode-badge')
  if (badge && badgeElement) {
    badgeElement.hidden = false
    badgeElement.textContent = badge
  }
}

function bindSnapshotWebActions(
  root: HTMLElement,
  strings: ReturnType<typeof getStrings>,
  refreshSnapshot: () => Promise<void>,
  demoMode: boolean,
) {
  root.addEventListener('submit', event => {
    const form = (event.target as HTMLElement).closest<HTMLFormElement>(
      '[data-pairing-form]',
    )
    if (!form) return
    event.preventDefault()
    const input = form.elements.namedItem('access-key')
    if (!(input instanceof HTMLInputElement)) return
    input.setCustomValidity('')
    if (!saveAccessKey(input.value)) {
      input.setCustomValidity(strings.pairingInvalid)
      input.reportValidity()
      return
    }
    window.location.reload()
  })

  root.addEventListener('click', event => {
    const refresh = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-refresh-snapshot]',
    )
    if (refresh) {
      refresh.disabled = true
      refresh.textContent = strings.mutationWorking
      void refreshSnapshot()
      return
    }

    const openInbox = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-open-inbox]',
    )
    if (openInbox) {
      window.location.href = demoMode ? '?demo=1' : window.location.pathname
      return
    }

    const openSettings = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-open-settings]',
    )
    if (openSettings) {
      openSettingsPage()
      return
    }

    const retry = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-reload]',
    )
    if (retry) {
      window.location.reload()
    }
  })
}

async function updateSnapshotImage(
  bridge: Awaited<ReturnType<typeof waitForEvenAppBridge>>,
  state: SnapshotState,
) {
  if (state.status !== 'ready') return
  const result = await bridge.updateImageRawData(
    new ImageRawDataUpdate({
      containerID: SNAPSHOT_IMAGE_CONTAINER_ID,
      containerName: SNAPSHOT_IMAGE_CONTAINER_NAME,
      imageData: state.snapshot.imageBase64,
    }),
  )
  if (!ImageRawDataUpdateResult.isSuccess(result)) {
    throw new Error(`Image update failed: ${result}`)
  }
}

const DEMO_SNAPSHOT: ScreenSnapshot = {
  id: 'demo-snapshot',
  createdAt: 1_710_000_000_000,
  width: 120,
  height: 80,
  mimeType: 'image/png',
  imageBase64:
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
}

function renderWeb(
  root: HTMLElement,
  view: ReaderView,
  strings: ReturnType<typeof getStrings>,
  badge?: string,
) {
  root.innerHTML = `
    <section class="reader-card" data-state="${view.status}">
      <div class="reader-topline">
        <p class="eyebrow" id="reader-eyebrow"></p>
        <div class="top-actions">
          <span class="mode-badge" id="mode-badge" hidden></span>
          <button type="button" class="settings-button" data-open-settings aria-label="${strings.openSettings}" title="${strings.openSettings}">⚙</button>
        </div>
      </div>
      <p class="reader-meta" id="reader-meta"></p>
      <h1 id="reader-heading"></h1>
      <div class="reader-body" id="reader-body"></div>
      <p class="reader-help" id="reader-help"></p>
      <p class="mutation-status" id="mutation-status" role="status"></p>
      <form class="pairing-form" data-pairing-form hidden>
        <label for="access-key" id="pairing-label"></label>
        <input
          id="access-key"
          name="access-key"
          type="text"
          inputmode="text"
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          required
        >
        <p id="pairing-help"></p>
        <button type="submit" id="pairing-save"></button>
      </form>
      <div class="reader-actions">
        <button type="button" data-action="previous-item" id="previous-item"></button>
        <button type="button" data-action="previous-page" id="previous-page"></button>
        <button type="button" data-action="next-page" id="next-page"></button>
        <button type="button" data-action="next-item" id="next-item"></button>
        <button type="button" data-refresh id="refresh-items"></button>
        <button type="button" data-reload id="retry" hidden></button>
      </div>
      <div class="mutation-actions" id="mutation-actions" hidden>
        <button type="button" data-read-toggle id="read-toggle"></button>
        <button type="button" class="danger-secondary" data-mutation="delete-current" id="delete-current"></button>
        <button type="button" class="danger" data-mutation="clear" id="clear-all"></button>
      </div>
    </section>
    <div class="confirmation-backdrop" id="confirmation-backdrop" hidden>
      <section class="confirmation-card" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
        <h2 id="confirmation-title"></h2>
        <p id="confirmation-body"></p>
        <div class="confirmation-actions">
          <button type="button" class="danger" data-confirm-mutation id="confirmation-confirm"></button>
          <button type="button" data-cancel-mutation id="confirmation-cancel"></button>
        </div>
      </section>
    </div>
  `

  setText(root, '#reader-eyebrow', view.eyebrow)
  setText(root, '#reader-meta', view.meta)
  setText(root, '#reader-heading', view.heading)
  setText(root, '#reader-body', view.body)
  setText(root, '#reader-help', view.help)
  setText(root, '#previous-item', strings.previousItem)
  setText(root, '#previous-page', strings.previousPage)
  setText(root, '#next-page', strings.nextPage)
  setText(root, '#next-item', strings.nextItem)
  setText(root, '#refresh-items', strings.refresh)
  setText(root, '#retry', strings.retry)
  setText(root, '#pairing-label', strings.pairingLabel)
  setText(root, '#pairing-help', strings.pairingHelp)
  setText(root, '#pairing-save', strings.pairingSave)
  setText(root, '#delete-current', strings.deleteCurrent)
  setText(root, '#clear-all', strings.clearAll)
  setText(
    root,
    '#read-toggle',
    view.currentRead ? strings.markUnread : strings.markRead,
  )
  setText(root, '#confirmation-cancel', strings.mutationCancel)

  const pairingForm = root.querySelector<HTMLFormElement>('[data-pairing-form]')
  if (pairingForm) pairingForm.hidden = !shouldShowPairingForm(view.needsPairing)
  const mutationActions = root.querySelector<HTMLElement>('#mutation-actions')
  if (mutationActions) mutationActions.hidden = view.status !== 'ready'

  const badgeElement = root.querySelector<HTMLElement>('#mode-badge')
  if (badge && badgeElement) {
    badgeElement.hidden = false
    badgeElement.textContent = badge
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-action]')) {
    const action = button.dataset.action
    button.disabled = action?.includes('item')
      ? !view.canNavigateItems
      : !view.canNavigatePages
  }

  const retryButton = root.querySelector<HTMLButtonElement>('#retry')
  if (retryButton) {
    retryButton.hidden = view.status !== 'error' || view.needsPairing
  }
}

function bindWebActions(
  root: HTMLElement,
  dispatch: (action: ReaderAction) => Promise<void>,
  strings: ReturnType<typeof getStrings>,
  getState: () => ReaderState,
  mutate: (action: MutationAction) => Promise<ReaderFailureReason | undefined>,
  refreshItems: () => Promise<void>,
  updateCurrentRead: () => Promise<void>,
) {
  root.addEventListener('submit', event => {
    const form = (event.target as HTMLElement).closest<HTMLFormElement>(
      '[data-pairing-form]',
    )
    if (!form) return
    event.preventDefault()
    const input = form.elements.namedItem('access-key')
    if (!(input instanceof HTMLInputElement)) return
    input.setCustomValidity('')
    if (!saveAccessKey(input.value)) {
      input.setCustomValidity(strings.pairingInvalid)
      input.reportValidity()
      return
    }
    window.location.reload()
  })

  root.addEventListener('click', event => {
    const readToggle = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-read-toggle]',
    )
    if (readToggle) {
      readToggle.disabled = true
      readToggle.textContent = strings.mutationWorking
      void updateCurrentRead().finally(() => {
        if (!readToggle.isConnected) return
        const currentItem = getCurrentItem(getState())
        readToggle.disabled = false
        readToggle.textContent = currentItem?.read
          ? strings.markUnread
          : strings.markRead
      })
      return
    }

    const refreshButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-refresh]',
    )
    if (refreshButton) {
      refreshButton.disabled = true
      refreshButton.textContent = strings.mutationWorking
      void refreshItems().finally(() => {
        if (!refreshButton.isConnected) return
        refreshButton.disabled = false
        refreshButton.textContent = strings.refresh
      })
      return
    }

    const cancelMutation = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-cancel-mutation]',
    )
    if (cancelMutation) {
      closeMutationConfirmation(root)
      return
    }

    const confirmMutation = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-confirm-mutation]',
    )
    if (confirmMutation) {
      const pending = root.dataset.pendingMutation
      if (pending !== 'delete-current' && pending !== 'clear') return
      confirmMutation.disabled = true
      confirmMutation.textContent = strings.mutationWorking
      const cancel = root.querySelector<HTMLButtonElement>('[data-cancel-mutation]')
      if (cancel) cancel.disabled = true
      void mutate(pending).then(async failure => {
        if (!failure) return
        closeMutationConfirmation(root)
        if (failure === 'unauthorized') {
          await dispatch({ type: 'fail', reason: failure })
          return
        }
        setText(root, '#mutation-status', strings.mutationFailure)
      })
      return
    }

    const mutationButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-mutation]',
    )
    if (mutationButton) {
      const action = mutationButton.dataset.mutation
      if (action !== 'delete-current' && action !== 'clear') return
      const state = getState()
      if (state.status !== 'ready') return
      const item = getCurrentItem(state)
      if (!item) return
      const title = item.title?.trim() || strings.untitled
      openMutationConfirmation(root, strings, action, title)
      return
    }

    const reloadButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-reload]',
    )
    if (reloadButton) {
      window.location.reload()
      return
    }

    const openSettings = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-open-settings]',
    )
    if (openSettings) {
      openSettingsPage()
      return
    }

    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-action]',
    )
    if (!button || button.disabled) return
    const type = button.dataset.action
    if (!isNavigationAction(type)) return
    void dispatch({ type })
  })
}

function openMutationConfirmation(
  root: HTMLElement,
  strings: ReturnType<typeof getStrings>,
  action: MutationAction,
  itemTitle: string,
) {
  root.dataset.pendingMutation = action
  setText(
    root,
    '#confirmation-title',
    action === 'delete-current'
      ? strings.mutationDeleteTitle
      : strings.mutationClearTitle,
  )
  setText(
    root,
    '#confirmation-body',
    action === 'delete-current'
      ? strings.mutationDeleteBody(itemTitle)
      : strings.mutationClearBody,
  )
  setText(
    root,
    '#confirmation-confirm',
    action === 'delete-current'
      ? strings.mutationConfirmDelete
      : strings.mutationConfirmClear,
  )
  const confirm = root.querySelector<HTMLButtonElement>('#confirmation-confirm')
  if (confirm) confirm.disabled = false
  const cancel = root.querySelector<HTMLButtonElement>('[data-cancel-mutation]')
  if (cancel) cancel.disabled = false
  const backdrop = root.querySelector<HTMLElement>('#confirmation-backdrop')
  if (backdrop) backdrop.hidden = false
  confirm?.focus()
}

function runSettingsMode(
  root: HTMLElement,
  strings: ReturnType<typeof getStrings>,
) {
  const hasAccessKey = Boolean(loadAccessKey())
  root.innerHTML = `
    <section class="reader-card settings-card" data-state="settings">
      <div class="reader-topline">
        <p class="eyebrow">${strings.settingsTitle}</p>
        <button type="button" class="settings-button" data-close-settings aria-label="${strings.settingsBack}" title="${strings.settingsBack}">←</button>
      </div>
      <h1>${strings.settingsTitle}</h1>
      <p class="summary">${hasAccessKey ? strings.settingsKeyStatusSet : strings.settingsKeyStatusMissing}</p>
      <form class="pairing-form" data-settings-pairing-form>
        <label for="access-key">${strings.pairingLabel}</label>
        <input
          id="access-key"
          name="access-key"
          type="text"
          inputmode="text"
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          required
        >
        <p>${strings.pairingHelp}</p>
        <button type="submit">${strings.pairingSave}</button>
      </form>
      <p class="mutation-status" id="settings-status" role="status"></p>
      <div class="reader-actions">
        <button type="button" data-close-settings>${strings.settingsBack}</button>
        <button type="button" class="danger-secondary" data-clear-access-key>${strings.settingsClearKey}</button>
      </div>
    </section>
  `

  root.addEventListener('submit', event => {
    const form = (event.target as HTMLElement).closest<HTMLFormElement>(
      '[data-settings-pairing-form]',
    )
    if (!form) return
    event.preventDefault()
    const input = form.elements.namedItem('access-key')
    if (!(input instanceof HTMLInputElement)) return
    input.setCustomValidity('')
    if (!saveAccessKey(input.value)) {
      input.setCustomValidity(strings.pairingInvalid)
      input.reportValidity()
      return
    }
    closeSettingsPage()
  })

  root.addEventListener('click', event => {
    const closeSettings = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-close-settings]',
    )
    if (closeSettings) {
      closeSettingsPage()
      return
    }

    const clearKey = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-clear-access-key]',
    )
    if (clearKey) {
      clearAccessKey()
      setText(root, '#settings-status', strings.settingsKeyCleared)
    }
  })
}

function shouldShowPairingForm(needsPairing: boolean): boolean {
  return needsPairing || !loadAccessKey()
}

function openSettingsPage() {
  const url = new URL(window.location.href)
  url.searchParams.set('settings', '1')
  window.location.href = `${url.pathname}${url.search}${url.hash}`
}

function closeSettingsPage() {
  const url = new URL(window.location.href)
  url.searchParams.delete('settings')
  window.location.href = `${url.pathname}${url.search}${url.hash}`
}

function closeMutationConfirmation(root: HTMLElement) {
  delete root.dataset.pendingMutation
  const backdrop = root.querySelector<HTMLElement>('#confirmation-backdrop')
  if (backdrop) backdrop.hidden = true
}

function isNavigationAction(
  value: string | undefined,
): value is ReaderNavigationAction['type'] {
  return (
    value === 'previous-item' ||
    value === 'next-item' ||
    value === 'previous-page' ||
    value === 'next-page'
  )
}

function bindBridgeActions(
  bridge: Awaited<ReturnType<typeof waitForEvenAppBridge>>,
  dispatch: (action: ReaderAction) => Promise<void>,
) {
  const unsubscribe = bridge.onEvenHubEvent(event => {
    const sysType = event.sysEvent?.eventType ?? null
    const textType = event.textEvent?.eventType ?? null
    const eventType = textType ?? sysType

    if (eventType === OsEventTypeList.CLICK_EVENT) {
      void dispatch({ type: 'next-item' })
    } else if (eventType === OsEventTypeList.SCROLL_TOP_EVENT) {
      void dispatch({ type: 'previous-page' })
    } else if (eventType === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
      void dispatch({ type: 'next-page' })
    } else if (eventType === OsEventTypeList.DOUBLE_CLICK_EVENT) {
      void bridge.shutDownPageContainer(1)
    } else if (
      sysType === OsEventTypeList.SYSTEM_EXIT_EVENT ||
      sysType === OsEventTypeList.ABNORMAL_EXIT_EVENT
    ) {
      unsubscribe()
    }
  })
}

function classifyFailure(
  error: unknown,
): ReaderFailureReason {
  if (error instanceof DOMException && error.name === 'AbortError') return 'timeout'
  if (error instanceof ApiStatusError) {
    return error.status === 401 ? 'unauthorized' : 'http'
  }
  if (error instanceof InvalidApiResponseError) return 'invalid-response'
  return 'network'
}

function setText(root: HTMLElement, selector: string, value: string) {
  const element = root.querySelector<HTMLElement>(selector)
  if (element) element.textContent = value
}

void main()
