import {
  CreateStartUpPageContainer,
  OsEventTypeList,
  TextContainerProperty,
  waitForEvenAppBridge,
} from '@evenrealities/even_hub_sdk'
import { DEFAULT_API_BASE_URL } from './api/localApiClient'
import { describeResult, probeLocalApi } from './reachability'
import './style.css'

const app = document.querySelector<HTMLElement>('#app')
if (!app) throw new Error('Missing #app root')

const result = await probeLocalApi()
const copy = describeResult(result)

app.innerHTML = `
  <section class="probe-card" data-state="${result.state}">
    <p class="eyebrow">M2 · forbindelsestest</p>
    <h1 id="probe-heading"></h1>
    <p class="summary" id="probe-summary"></p>
    <dl>
      <div><dt>Endpoint</dt><dd>${DEFAULT_API_BASE_URL}</dd></div>
      <div><dt>Transport</dt><dd>Kun lokal HTTP</dd></div>
      <div><dt>Adgang</dt><dd>Læsning uden cloud</dd></div>
    </dl>
    <button type="button" id="retry">Prøv igen</button>
  </section>
`

const heading = document.querySelector<HTMLElement>('#probe-heading')
const summary = document.querySelector<HTMLElement>('#probe-summary')
if (heading) heading.textContent = copy.heading
if (summary) summary.textContent = copy.summary

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
