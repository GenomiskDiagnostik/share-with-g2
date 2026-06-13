import {
  CreateStartUpPageContainer,
  OsEventTypeList,
  TextContainerProperty,
  waitForEvenAppBridge,
} from '@evenrealities/even_hub_sdk'
import { DEFAULT_API_BASE_URL } from './api/localApiClient'
import { describeResult, probeLocalApi } from './reachability'
import { getStrings, resolveLocale } from './strings'
import './style.css'

async function main() {
  const app = document.querySelector<HTMLElement>('#app')
  if (!app) throw new Error('Missing #app root')

  const locale = resolveLocale(navigator.languages)
  const strings = getStrings(locale)
  const result = await probeLocalApi()
  const copy = describeResult(result, locale)
  document.documentElement.lang = locale

  app.innerHTML = `
    <section class="probe-card" data-state="${result.state}">
      <p class="eyebrow" id="probe-eyebrow"></p>
      <h1 id="probe-heading"></h1>
      <p class="summary" id="probe-summary"></p>
      <dl>
        <div><dt id="endpoint-label"></dt><dd>${DEFAULT_API_BASE_URL}</dd></div>
        <div><dt id="transport-label"></dt><dd id="transport-value"></dd></div>
        <div><dt id="access-label"></dt><dd id="access-value"></dd></div>
      </dl>
      <button type="button" id="retry"></button>
    </section>
  `

  setText('#probe-eyebrow', strings.probeEyebrow)
  const heading = document.querySelector<HTMLElement>('#probe-heading')
  const summary = document.querySelector<HTMLElement>('#probe-summary')
  if (heading) heading.textContent = copy.heading
  if (summary) summary.textContent = copy.summary
  setText('#endpoint-label', strings.endpoint)
  setText('#transport-label', strings.transport)
  setText('#transport-value', strings.transportValue)
  setText('#access-label', strings.access)
  setText('#access-value', strings.accessValue)
  setText('#retry', strings.retry)

  document.querySelector('#retry')?.addEventListener('click', () => {
    window.location.reload()
  })

  try {
    const bridge = await waitForEvenAppBridge()
    const body = new TextContainerProperty({
      xPosition: 0,
      yPosition: 0,
      width: 576,
      height: 288,
      borderWidth: 0,
      borderColor: 5,
      paddingLength: 8,
      containerID: 1,
      containerName: 'reachability',
      content: copy.glassText,
      isEventCapture: 1,
    })

    await bridge.createStartUpPageContainer(
      new CreateStartUpPageContainer({
        containerTotalNum: 1,
        textObject: [body],
      }),
    )

    const unsubscribe = bridge.onEvenHubEvent((event) => {
      const sysType = event.sysEvent?.eventType ?? null
      const textType = event.textEvent?.eventType ?? null
      if (
        sysType === OsEventTypeList.DOUBLE_CLICK_EVENT ||
        textType === OsEventTypeList.DOUBLE_CLICK_EVENT
      ) {
        void bridge.shutDownPageContainer(1)
        return
      }
      if (
        sysType === OsEventTypeList.SYSTEM_EXIT_EVENT ||
        sysType === OsEventTypeList.ABNORMAL_EXIT_EVENT
      ) {
        unsubscribe()
      }
    })
  } catch {
    app.dataset.bridge = 'unavailable'
  }
}

function setText(selector: string, value: string) {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) element.textContent = value
}

void main()
