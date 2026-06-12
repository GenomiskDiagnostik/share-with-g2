import {
  waitForEvenAppBridge,
  TextContainerProperty,
  CreateStartUpPageContainer,
  TextContainerUpgrade,
  OsEventTypeList,
} from '@evenrealities/even_hub_sdk'

type SharedItem = {
  id: string
  type: 'text' | 'url' | 'image' | 'file'
  title?: string
  text?: string
  uri?: string
  sourceApp?: string
  createdAt: number
  read: boolean
}

const API = 'http://127.0.0.1:8765'

let items: SharedItem[] = []
let selectedIndex = 0
let pageIndex = 0

function chunkText(text: string, maxChars = 850): string[] {
  if (text.length <= maxChars) return [text]

  const chunks: string[] = []
  let cursor = 0

  while (cursor < text.length) {
    const next = text.slice(cursor, cursor + maxChars)
    chunks.push(next)
    cursor += maxChars
  }

  return chunks
}

async function loadItems() {
  const res = await fetch(`${API}/items`)
  if (!res.ok) throw new Error(`API returned ${res.status}`)
  items = await res.json() as SharedItem[]
}

function currentText() {
  if (items.length === 0) {
    return 'Shared Inbox\n\nIngen delte elementer endnu.'
  }

  const item = items[selectedIndex]
  const body = item.text ?? item.uri ?? ''
  const pages = chunkText(body)
  const safePageIndex = Math.min(pageIndex, Math.max(0, pages.length - 1))
  const header = `${selectedIndex + 1}/${items.length} · ${item.type.toUpperCase()} · side ${safePageIndex + 1}/${pages.length}`
  const title = item.title ?? 'Untitled'

  return `${header}\n${title}\n\n${pages[safePageIndex]}\n\nTap: næste · Swipe: side · Double tap: slet`
}

const bridge = await waitForEvenAppBridge()

try {
  await loadItems()
} catch {
  items = []
}

const body = new TextContainerProperty({
  xPosition: 0,
  yPosition: 0,
  width: 576,
  height: 260,
  borderWidth: 0,
  borderColor: 5,
  paddingLength: 6,
  containerID: 1,
  containerName: 'sharedInboxBody',
  content: currentText(),
  isEventCapture: 1,
})

await bridge.createStartUpPageContainer(
  new CreateStartUpPageContainer({
    containerTotalNum: 1,
    textObject: [body],
  }),
)

async function render() {
  await bridge.textContainerUpgrade(
    new TextContainerUpgrade({
      containerID: 1,
      containerName: 'sharedInboxBody',
      content: currentText(),
    }),
  )
}

async function deleteCurrent() {
  if (items.length === 0) return

  const item = items[selectedIndex]
  await fetch(`${API}/items/${item.id}`, { method: 'DELETE' })
  await loadItems()

  selectedIndex = Math.min(selectedIndex, Math.max(0, items.length - 1))
  pageIndex = 0
  await render()
}

bridge.onEvenHubEvent((event) => {
  const sysType = event.sysEvent?.eventType ?? null
  const textType = event.textEvent?.eventType ?? null

  if (sysType === OsEventTypeList.CLICK_EVENT) {
    selectedIndex = Math.min(selectedIndex + 1, Math.max(0, items.length - 1))
    pageIndex = 0
    void render()
    return
  }

  if (textType === OsEventTypeList.SCROLL_TOP_EVENT) {
    pageIndex = Math.max(0, pageIndex - 1)
    void render()
    return
  }

  if (textType === OsEventTypeList.SCROLL_BOTTOM_EVENT) {
    pageIndex += 1
    void render()
    return
  }

  if (sysType === OsEventTypeList.DOUBLE_CLICK_EVENT) {
    void deleteCurrent()
    return
  }
})
