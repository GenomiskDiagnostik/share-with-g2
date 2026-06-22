import {
  CreateStartUpPageContainer,
  ImageContainerProperty,
  ImageRawDataUpdate,
  ImageRawDataUpdateResult,
  ListContainerProperty,
  ListItemContainerProperty,
  OsEventTypeList,
  RebuildPageContainer,
  StartUpPageCreateResult,
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
  getCurrentPages,
  reduceReader,
  type ReaderAction,
  type ReaderNavigationAction,
  type ReaderFailureReason,
  type ReaderState,
} from './inbox/readerState'
import {
  buildInboxMenu,
  findInboxMenuEntry,
  getInboxMenuPageIndex,
  type InboxMenuEntry,
  type InboxMenuPage,
} from './inbox/inboxMenu'
import { ReaderScrollGate } from './inbox/readerScrollGate'
import { ItemTapTracker } from './inbox/itemTapTracker'
import { nativeListAction, normalizeBridgeEvent } from './inbox/bridgeEvent'
import { rebuildWithRetry } from './inbox/rebuildWithRetry'
import { R1InputTracker } from './inbox/r1Input'
import {
  RefreshCoordinator,
  type RefreshOutcome,
} from './inbox/refreshCoordinator'
import { DEMO_ITEMS, renderReader, type ReaderView } from './inbox/renderReader'
import { renderSnapshot, type SnapshotState, type SnapshotView } from './snapshot/renderSnapshot'
import { decodeBase64Image } from './snapshot/imageData'
import { getStrings, resolveLocale } from './strings'
import './style.css'

const CONTAINER_ID = 1
const CONTAINER_NAME = 'sharedInbox'
const MENU_HEADER_CONTAINER_ID = 10
const MENU_HEADER_CONTAINER_NAME = 'inboxHeader'
const MENU_LIST_CONTAINER_ID = 11
const MENU_LIST_CONTAINER_NAME = 'inboxMenu'
const SNAPSHOT_TEXT_CONTAINER_ID = 2
const SNAPSHOT_TEXT_CONTAINER_NAME = 'snapshotText'
const SNAPSHOT_IMAGE_CONTAINER_ID = 3
const SNAPSHOT_IMAGE_CONTAINER_NAME = 'snapshotImage'
const REFRESH_INTERVAL_MS = 10_000
const SCREEN_SHARE_REFRESH_INTERVAL_MS = 500
const MENU_REBUILD_SETTLE_MS = 600
type MutationAction = 'delete-current' | 'clear'
type GlassesMode = 'menu' | 'reader' | 'delete-confirmation'

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
  let glassesMode: GlassesMode = 'menu'
  let glassesSurface: 'text' | 'menu' = 'text'
  let glassesRenderKey = ''
  let menuRebuildNotBefore = 0
  let menuPageIndex = 0
  let bridgeEventCount = 0
  let refreshCoordinator: RefreshCoordinator | undefined
  let hasLoadedItems = false
  const scrollGate = new ReaderScrollGate()

  const reportBridgeInput = (kind: string, source: string) => {
    bridgeEventCount += 1
    const value = strings.inputDiagnostics(bridgeEventCount, kind, source)
    root.dataset.inputDiagnostics = value
    const diagnostics = root.querySelector<HTMLElement>('#input-diagnostics')
    if (diagnostics) {
      diagnostics.hidden = false
      diagnostics.textContent = value
    }
  }

  const render = async () => {
    const view = renderReader(state, locale)
    renderWeb(root, state, view, strings, demoMode ? strings.demoMode : undefined)
    if (!bridge) return

    if (glassesMode === 'delete-confirmation') {
      const item = getCurrentItem(state)
      if (!item) {
        glassesMode = 'menu'
        await render()
        return
      }
      const title = item.title?.trim() || strings.untitled
      const content = [
        strings.mutationDeleteTitle,
        strings.mutationDeleteBody(title),
        strings.glassesDeleteHelp,
      ].join('\n\n')
      const key = `delete-confirmation:${item.id}`
      if (key === glassesRenderKey) return
      if (glassesSurface === 'text') {
        await bridge.textContainerUpgrade(new TextContainerUpgrade({
          containerID: CONTAINER_ID,
          containerName: CONTAINER_NAME,
          contentOffset: 0,
          contentLength: content.length,
          content,
        }))
      } else {
        await bridge.rebuildPageContainer(createReaderContainer(content))
      }
      glassesSurface = 'text'
      glassesRenderKey = key
      return
    }

    if (hasInboxMenuState(state) && glassesMode === 'menu') {
      const menu = createInboxMenu(state, menuPageIndex, strings)
      menuPageIndex = menu.pageIndex
      const key = `menu:${menu.entries.map(entry => entry.label).join('|')}`
      if (key === glassesRenderKey) return
      if (glassesSurface === 'text') {
        await waitUntil(menuRebuildNotBefore)
      }
      const rebuilt = await rebuildWithRetry(() =>
        bridge!.rebuildPageContainer(createInboxMenuContainer(menu, strings)),
      )
      if (!rebuilt) {
        if (glassesSurface === 'text') {
          const fallback = `Send to G2\n\n${strings.readerTitle}\n\n${strings.menuRetry}`
          await bridge.textContainerUpgrade(
            new TextContainerUpgrade({
              containerID: CONTAINER_ID,
              containerName: CONTAINER_NAME,
              contentOffset: 0,
              contentLength: fallback.length,
              content: fallback,
            }),
          )
          glassesRenderKey = `menu-fallback:${key}`
        }
        return
      }
      glassesSurface = 'menu'
      glassesRenderKey = key
      return
    }

    const key = `text:${view.glassText}`
    if (key === glassesRenderKey) return
    if (glassesSurface === 'text') {
      await bridge.textContainerUpgrade(
        new TextContainerUpgrade({
          containerID: CONTAINER_ID,
          containerName: CONTAINER_NAME,
          contentOffset: 0,
          contentLength: view.glassText.length,
          content: view.glassText,
        }),
      )
    } else {
      await bridge.rebuildPageContainer(createReaderContainer(view.glassText))
    }
    glassesSurface = 'text'
    glassesRenderKey = key
  }

  const dispatch = async (action: ReaderAction) => {
    state = reduceReader(state, action)
    await render()
  }

  const selectItem = async (index: number) => {
    glassesMode = 'reader'
    await dispatch({ type: 'select-item', index })
  }

  const showMenu = async () => {
    if (state.status === 'ready') {
      menuPageIndex = getInboxMenuPageIndex(state.selectedIndex)
    }
    glassesMode = 'menu'
    await render()
  }

  const handleMenuEntry = async (entry: InboxMenuEntry) => {
    if (entry.kind === 'screen-sharing') {
      openSnapshotMode(demoMode)
      return
    }
    if (entry.kind === 'item') {
      await selectItem(entry.itemIndex)
      return
    }
    menuPageIndex += entry.kind === 'next-page' ? 1 : -1
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

  const requestDeleteFromMenu = async (entry: InboxMenuEntry) => {
    if (entry.kind !== 'item') return
    glassesMode = 'delete-confirmation'
    await dispatch({ type: 'select-item', index: entry.itemIndex })
  }

  const confirmDeleteFromGlasses = async () => {
    glassesMode = 'menu'
    const failure = await mutate('delete-current')
    if (failure) {
      if (failure === 'unauthorized') {
        await dispatch({ type: 'fail', reason: failure })
      } else {
        setText(root, '#mutation-status', strings.mutationFailure)
        await render()
      }
      return
    }
    await showMenu()
  }

  const performRefresh = async (): Promise<RefreshOutcome> => {
    if (demoMode) {
      await dispatch({ type: 'refresh', items: DEMO_ITEMS })
      hasLoadedItems = true
      return 'success'
    }
    if (!client) return 'retryable-failure'
    try {
      await dispatch({ type: 'refresh', items: await client.items() })
      hasLoadedItems = true
      return 'success'
    } catch (error) {
      const failure = classifyFailure(error)
      if (failure === 'unauthorized') {
        await dispatch({ type: 'fail', reason: failure })
        return 'terminal-failure'
      }
      if (!hasLoadedItems) await dispatch({ type: 'fail', reason: failure })
      return 'retryable-failure'
    }
  }

  const refreshItems = async (manual: boolean) => {
    const outcome = refreshCoordinator
      ? await refreshCoordinator.refreshNow()
      : await performRefresh()
    if (!manual) return
    setText(
      root,
      '#mutation-status',
      outcome === 'success' ? strings.refreshSuccess : strings.refreshFailure,
    )
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
    selectItem,
  )
  renderWeb(
    root,
    state,
    renderReader(state, locale),
    strings,
    demoMode ? strings.demoMode : undefined,
  )

  try {
    bridge = await waitForEvenAppBridge()
    const initialView = renderReader(state, locale)
    const startupResult = await bridge.createStartUpPageContainer(
      createReaderStartupContainer(initialView.glassText),
    )
    if (
      StartUpPageCreateResult.normalize(startupResult) !==
      StartUpPageCreateResult.success
    ) {
      throw new Error(`G2 startup container failed: ${startupResult}`)
    }
    menuRebuildNotBefore = Date.now() + MENU_REBUILD_SETTLE_MS
    glassesSurface = 'text'
    glassesRenderKey = `text:${initialView.glassText}`
    bindBridgeActions(
      bridge,
      () => state,
      () => glassesMode,
      () => glassesSurface,
      () => createInboxMenu(state, menuPageIndex, strings),
      handleMenuEntry,
      requestDeleteFromMenu,
      showMenu,
      confirmDeleteFromGlasses,
      reportBridgeInput,
      dispatch,
      scrollGate,
    )
  } catch {
    bridge = undefined
    root.dataset.bridge = 'unavailable'
  }

  if (demoMode) {
    await dispatch({ type: 'load', items: DEMO_ITEMS })
  } else {
    client = new LocalApiClient(
      undefined,
      undefined,
      undefined,
      loadAccessKey(),
    )
    refreshCoordinator = new RefreshCoordinator(
      performRefresh,
      undefined,
      undefined,
      undefined,
      REFRESH_INTERVAL_MS,
    )
    refreshCoordinator.start()
    window.addEventListener('beforeunload', () => refreshCoordinator?.stop(), {
      once: true,
    })
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
  let loadPromise: Promise<void> | undefined
  let renderedSnapshotId: string | undefined
  let renderedGlassText = ''

  const render = async () => {
    const view = renderSnapshot(state, locale)
    renderSnapshotWeb(root, view, strings, demoMode ? strings.demoMode : undefined)
    if (bridge && bridgeReady) {
      if (view.glassText !== renderedGlassText) {
        await bridge.textContainerUpgrade(
          new TextContainerUpgrade({
            containerID: SNAPSHOT_TEXT_CONTAINER_ID,
            containerName: SNAPSHOT_TEXT_CONTAINER_NAME,
            contentOffset: 0,
            contentLength: view.glassText.length,
            content: view.glassText,
          }),
        )
        renderedGlassText = view.glassText
      }
      await updateSnapshotImage(bridge, state)
    }
  }

  const setState = async (next: SnapshotState) => {
    state = next
    await render()
  }

  const performLoad = async () => {
    try {
      if (demoMode) {
        if (renderedSnapshotId !== DEMO_SNAPSHOT.id) {
          await setState({ status: 'ready', snapshot: DEMO_SNAPSHOT })
          renderedSnapshotId = DEMO_SNAPSHOT.id
        }
        return
      }
      if (!client) return
      const snapshot = await client.screenSnapshot()
      if (snapshot.id === renderedSnapshotId) return
      await setState({ status: 'ready', snapshot })
      renderedSnapshotId = snapshot.id
    } catch (error) {
      if (error instanceof ApiStatusError && error.status === 404) {
        renderedSnapshotId = undefined
        if (state.status !== 'empty') await setState({ status: 'empty' })
        return
      }
      await setState({ status: 'error', reason: classifyFailure(error) })
    }
  }

  const loadSnapshot = async (manual: boolean) => {
    if (!loadPromise) {
      loadPromise = performLoad()
      const currentLoad = loadPromise
      void currentLoad.finally(() => {
        if (loadPromise === currentLoad) loadPromise = undefined
      })
    }
    try {
      await loadPromise
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
    renderedGlassText = view.glassText
    bindSnapshotBridgeActions(
      bridge,
      () => loadSnapshot(true),
      () => openInboxMode(demoMode),
    )
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
    }, SCREEN_SHARE_REFRESH_INTERVAL_MS)
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
      <div class="reader-actions">
        <button type="button" data-refresh-snapshot>${strings.snapshotRefresh}</button>
        <button type="button" data-open-inbox>${strings.snapshotOpenInbox}</button>
        <button type="button" data-open-settings data-pairing-settings hidden>${strings.openSettings}</button>
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

  const pairingSettings = root.querySelector<HTMLButtonElement>('[data-pairing-settings]')
  if (pairingSettings) pairingSettings.hidden = !view.needsPairing
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
      openInboxMode(demoMode)
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
      imageData: decodeBase64Image(state.snapshot.imageBase64),
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

function createInboxMenu(
  state: ReaderState,
  pageIndex: number,
  strings: ReturnType<typeof getStrings>,
): InboxMenuPage {
  return buildInboxMenu(
    state.status === 'ready' ? state.items : [],
    pageIndex,
    {
      untitled: strings.untitled,
      unread: strings.readStateUnread,
      read: strings.readStateRead,
      previous: strings.menuPrevious,
      next: strings.menuNext,
      screenSharing: strings.snapshotTitle,
    },
  )
}

function hasInboxMenuState(state: ReaderState): boolean {
  return state.status === 'ready' || state.status === 'empty'
}

function createInboxMenuContainer(
  menu: InboxMenuPage,
  strings: ReturnType<typeof getStrings>,
): RebuildPageContainer {
  return new RebuildPageContainer(createInboxMenuLayout(menu, strings))
}

function createInboxMenuLayout(
  menu: InboxMenuPage,
  strings: ReturnType<typeof getStrings>,
) {
  const title = `${strings.readerTitle} ${menu.pageIndex + 1}/${menu.pageCount}`
  return {
    containerTotalNum: 2,
    textObject: [
      new TextContainerProperty({
        xPosition: 0,
        yPosition: 0,
        width: 576,
        height: 48,
        borderWidth: 0,
        paddingLength: 6,
        containerID: MENU_HEADER_CONTAINER_ID,
        containerName: MENU_HEADER_CONTAINER_NAME,
        content: `${title}\n${strings.menuHelp}`,
        isEventCapture: 0,
      }),
    ],
    listObject: [
      new ListContainerProperty({
        xPosition: 0,
        yPosition: 50,
        width: 576,
        height: 238,
        borderWidth: 0,
        paddingLength: 6,
        containerID: MENU_LIST_CONTAINER_ID,
        containerName: MENU_LIST_CONTAINER_NAME,
        itemContainer: new ListItemContainerProperty({
          itemCount: menu.entries.length,
          itemWidth: 0,
          isItemSelectBorderEn: 1,
          itemName: menu.entries.map(entry => entry.label),
        }),
        isEventCapture: 1,
      }),
    ],
  }
}

function createReaderContainer(content: string): RebuildPageContainer {
  return new RebuildPageContainer({
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
        content,
        isEventCapture: 1,
      }),
    ],
  })
}

function createReaderStartupContainer(content: string): CreateStartUpPageContainer {
  return new CreateStartUpPageContainer({
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
        content,
        isEventCapture: 1,
      }),
    ],
  })
}

function renderWeb(
  root: HTMLElement,
  state: ReaderState,
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
      <section class="item-picker" id="item-picker" hidden>
        <h2 id="item-picker-title"></h2>
        <div class="item-picker-list" id="item-picker-list"></div>
      </section>
      <p class="reader-meta" id="reader-meta"></p>
      <h1 id="reader-heading"></h1>
      <div class="reader-body" id="reader-body"></div>
      <p class="reader-help" id="reader-help"></p>
      <p class="reader-help" id="input-diagnostics" hidden></p>
      <p class="mutation-status" id="mutation-status" role="status"></p>
      <div class="reader-actions">
        <button type="button" data-action="previous-page" id="previous-page"></button>
        <button type="button" data-action="next-page" id="next-page"></button>
        <button type="button" data-refresh id="refresh-items"></button>
        <button type="button" data-open-snapshot id="open-snapshot"></button>
        <button type="button" data-open-settings id="pairing-settings" hidden></button>
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
  const inputDiagnostics = root.querySelector<HTMLElement>('#input-diagnostics')
  if (inputDiagnostics && root.dataset.inputDiagnostics) {
    inputDiagnostics.hidden = false
    inputDiagnostics.textContent = root.dataset.inputDiagnostics
  }
  setText(root, '#previous-page', strings.previousPage)
  setText(root, '#next-page', strings.nextPage)
  setText(root, '#refresh-items', strings.refresh)
  setText(root, '#open-snapshot', strings.snapshotOpenSharing)
  setText(root, '#retry', strings.retry)
  setText(root, '#pairing-settings', strings.openSettings)
  setText(root, '#delete-current', strings.deleteCurrent)
  setText(root, '#clear-all', strings.clearAll)
  setText(
    root,
    '#read-toggle',
    view.currentRead ? strings.markUnread : strings.markRead,
  )
  setText(root, '#confirmation-cancel', strings.mutationCancel)

  renderItemPicker(root, state, strings)
  const pairingSettings = root.querySelector<HTMLButtonElement>('#pairing-settings')
  if (pairingSettings) pairingSettings.hidden = !view.needsPairing
  const mutationActions = root.querySelector<HTMLElement>('#mutation-actions')
  if (mutationActions) mutationActions.hidden = view.status !== 'ready'

  const badgeElement = root.querySelector<HTMLElement>('#mode-badge')
  if (badge && badgeElement) {
    badgeElement.hidden = false
    badgeElement.textContent = badge
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-action]')) {
    const action = button.dataset.action
    button.disabled = !view.canNavigatePages
  }

  const retryButton = root.querySelector<HTMLButtonElement>('#retry')
  if (retryButton) {
    retryButton.hidden = view.status !== 'error' || view.needsPairing
  }
}

function renderItemPicker(
  root: HTMLElement,
  state: ReaderState,
  strings: ReturnType<typeof getStrings>,
) {
  const picker = root.querySelector<HTMLElement>('#item-picker')
  const list = root.querySelector<HTMLElement>('#item-picker-list')
  if (!picker || !list) return
  picker.hidden = state.status !== 'ready'
  if (state.status !== 'ready') return

  setText(root, '#item-picker-title', strings.itemPickerTitle)
  state.items.forEach((item, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'item-picker-button'
    button.dataset.selectItemIndex = String(index)
    button.setAttribute('aria-current', index === state.selectedIndex ? 'true' : 'false')
    const title = item.title?.trim() || strings.untitled
    const readState = item.read ? strings.readStateRead : strings.readStateUnread
    button.textContent = `${index + 1}. ${title} - ${readState}`
    list.append(button)
  })
}

function bindWebActions(
  root: HTMLElement,
  dispatch: (action: ReaderAction) => Promise<void>,
  strings: ReturnType<typeof getStrings>,
  getState: () => ReaderState,
  mutate: (action: MutationAction) => Promise<ReaderFailureReason | undefined>,
  refreshItems: () => Promise<void>,
  updateCurrentRead: () => Promise<void>,
  selectItem: (index: number) => Promise<void>,
) {
  const itemTapTracker = new ItemTapTracker(
    index => void selectItem(index),
    index => {
      void selectItem(index).then(() => {
        const item = getCurrentItem(getState())
        if (!item) return
        const title = item.title?.trim() || strings.untitled
        openMutationConfirmation(root, strings, 'delete-current', title)
      })
    },
  )

  root.addEventListener('click', event => {
    const selectedItem = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-select-item-index]',
    )
    if (selectedItem) {
      const index = Number(selectedItem.dataset.selectItemIndex)
      if (Number.isInteger(index)) itemTapTracker.tap(index)
      return
    }
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

    const openSnapshot = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-open-snapshot]',
    )
    if (openSnapshot) {
      const demoMode = new URLSearchParams(window.location.search).get('demo') === '1'
      openSnapshotMode(demoMode)
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
  getState: () => ReaderState,
  getMode: () => GlassesMode,
  getSurface: () => 'text' | 'menu',
  getMenu: () => InboxMenuPage,
  handleMenuEntry: (entry: InboxMenuEntry) => Promise<void>,
  requestDelete: (entry: InboxMenuEntry) => Promise<void>,
  showMenu: () => Promise<void>,
  confirmDelete: () => Promise<void>,
  reportInput: (kind: string, source: string) => void,
  dispatch: (action: ReaderAction) => Promise<void>,
  scrollGate: ReaderScrollGate,
) {
  const inputTracker = new R1InputTracker()
  let bridgeActionBusy = false
  const runBridgeAction = async (action: () => Promise<void>) => {
    if (bridgeActionBusy) return
    bridgeActionBusy = true
    try {
      await action()
    } finally {
      bridgeActionBusy = false
    }
  }
  const unsubscribe = bridge.onEvenHubEvent(event => {
    const normalized = normalizeBridgeEvent(event)
    const input = inputTracker.handle(normalized.event)
    reportInput(input.kind, normalized.source)
    if (input.kind === 'exit') {
      unsubscribe()
      return
    }

    const listAction = nativeListAction(normalized.event.listEvent)
    if (getMode() === 'menu' && listAction) {
      if (getSurface() === 'text') {
        if (listAction === 'accept') void runBridgeAction(showMenu)
        return
      }
      const menu = getMenu()
      const listEvent = normalized.event.listEvent
      const entry = findInboxMenuEntry(
        menu,
        listEvent?.currentSelectItemName,
        listEvent?.currentSelectItemIndex,
      ) ?? menu.entries[0]
      if (!entry) return
      void runBridgeAction(() => listAction === 'accept'
        ? handleMenuEntry(entry)
        : requestDelete(entry))
      return
    }

    if (getMode() === 'menu') {
      if (input.kind !== 'click' && input.kind !== 'double-click') return
      if (getSurface() === 'text') {
        if (input.kind === 'click') void showMenu()
        return
      }
      const menu = getMenu()
      const entry = findInboxMenuEntry(
        menu,
        input.selectedName,
        input.selectedIndex,
      ) ?? menu.entries[0]
      if (!entry) return
      if (input.kind === 'click') {
        void runBridgeAction(() => handleMenuEntry(entry))
      } else {
        void runBridgeAction(() => requestDelete(entry))
      }
      return
    }

    if (getMode() === 'delete-confirmation') {
      if (input.kind === 'click') {
        void runBridgeAction(confirmDelete)
      } else if (input.kind === 'double-click') {
        void runBridgeAction(showMenu)
      }
      return
    }

    if (input.kind === 'double-click') {
      void runBridgeAction(showMenu)
      return
    }
    if (input.kind !== 'scroll-top' && input.kind !== 'scroll-bottom') return

    const state = getState()
    if (state.status !== 'ready') return
    const action = scrollGate.actionFor(
      input.kind === 'scroll-top' ? 'top' : 'bottom',
      state.pageIndex,
      getCurrentPages(state).length,
    )
    if (action) void dispatch({ type: action })
  })
}

function bindSnapshotBridgeActions(
  bridge: Awaited<ReturnType<typeof waitForEvenAppBridge>>,
  refresh: () => Promise<void>,
  openInbox: () => void,
) {
  const unsubscribe = bridge.onEvenHubEvent(event => {
    const sysType = event.sysEvent?.eventType ?? null
    const textType = event.textEvent?.eventType ?? null
    const eventType = textType ?? sysType
    if (eventType === OsEventTypeList.CLICK_EVENT) {
      void refresh()
    } else if (eventType === OsEventTypeList.DOUBLE_CLICK_EVENT) {
      openInbox()
    } else if (
      sysType === OsEventTypeList.SYSTEM_EXIT_EVENT ||
      sysType === OsEventTypeList.ABNORMAL_EXIT_EVENT
    ) {
      unsubscribe()
    }
  })
}

function openSnapshotMode(demoMode: boolean) {
  window.location.href = demoMode ? '?mode=snapshot&demo=1' : '?mode=snapshot'
}

function openInboxMode(demoMode: boolean) {
  window.location.href = demoMode ? '?demo=1' : window.location.pathname
}

async function waitUntil(timestamp: number): Promise<void> {
  const remaining = timestamp - Date.now()
  if (remaining <= 0) return
  await new Promise(resolve => globalThis.setTimeout(resolve, remaining))
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
