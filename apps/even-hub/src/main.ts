import {
  CreateStartUpPageContainer,
  OsEventTypeList,
  TextContainerProperty,
  TextContainerUpgrade,
  waitForEvenAppBridge,
} from '@evenrealities/even_hub_sdk'
import {
  ApiStatusError,
  InvalidApiResponseError,
  LocalApiClient,
} from './api/localApiClient'
import { loadAccessKey, saveAccessKey } from './auth/accessKey'
import {
  reduceReader,
  type ReaderAction,
  type ReaderNavigationAction,
  type ReaderFailureReason,
  type ReaderState,
} from './inbox/readerState'
import { DEMO_ITEMS, renderReader, type ReaderView } from './inbox/renderReader'
import { getStrings, resolveLocale } from './strings'
import './style.css'

const CONTAINER_ID = 1
const CONTAINER_NAME = 'sharedInbox'

async function main() {
  const root = document.querySelector<HTMLElement>('#app')
  if (!root) throw new Error('Missing #app root')

  const locale = resolveLocale(navigator.languages)
  const strings = getStrings(locale)
  const demoMode = new URLSearchParams(window.location.search).get('demo') === '1'
  document.documentElement.lang = locale

  let state: ReaderState = { status: 'loading' }
  let bridge: Awaited<ReturnType<typeof waitForEvenAppBridge>> | undefined

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

  bindWebActions(root, dispatch, strings)
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

  const client = new LocalApiClient(
    undefined,
    undefined,
    undefined,
    loadAccessKey(),
  )
  try {
    await client.health()
    await dispatch({ type: 'load', items: await client.items() })
  } catch (error) {
    await dispatch({ type: 'fail', reason: classifyFailure(error) })
  }
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
        <span class="mode-badge" id="mode-badge" hidden></span>
      </div>
      <p class="reader-meta" id="reader-meta"></p>
      <h1 id="reader-heading"></h1>
      <div class="reader-body" id="reader-body"></div>
      <p class="reader-help" id="reader-help"></p>
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
        <button type="button" data-reload id="retry" hidden></button>
      </div>
    </section>
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
  setText(root, '#retry', strings.retry)
  setText(root, '#pairing-label', strings.pairingLabel)
  setText(root, '#pairing-help', strings.pairingHelp)
  setText(root, '#pairing-save', strings.pairingSave)

  const pairingForm = root.querySelector<HTMLFormElement>('[data-pairing-form]')
  if (pairingForm) pairingForm.hidden = !view.needsPairing

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
    const reloadButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-reload]',
    )
    if (reloadButton) {
      window.location.reload()
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
