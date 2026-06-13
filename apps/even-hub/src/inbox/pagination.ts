export const DEFAULT_PAGE_LENGTH = 700

export function paginateText(
  text: string,
  maxLength = DEFAULT_PAGE_LENGTH,
): string[] {
  if (maxLength < 1) throw new RangeError('maxLength must be positive')

  const normalized = text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim()

  if (!normalized) return ['']

  const pages: string[] = []
  let remaining = normalized

  while (remaining.length > maxLength) {
    const candidate = remaining.slice(0, maxLength + 1)
    const breakAt = findBreak(candidate, maxLength)
    pages.push(remaining.slice(0, breakAt).trimEnd())
    remaining = remaining.slice(breakAt).trimStart()
  }

  pages.push(remaining)
  return pages
}

function findBreak(candidate: string, maxLength: number): number {
  const paragraph = candidate.lastIndexOf('\n\n', maxLength)
  if (paragraph >= Math.floor(maxLength * 0.5)) return paragraph + 2

  const line = candidate.lastIndexOf('\n', maxLength)
  if (line >= Math.floor(maxLength * 0.6)) return line + 1

  const whitespace = Math.max(
    candidate.lastIndexOf(' ', maxLength),
    candidate.lastIndexOf('\t', maxLength),
  )
  if (whitespace >= Math.floor(maxLength * 0.7)) return whitespace + 1

  return maxLength
}
