import { describe, expect, it } from 'vitest'
import { decodeBase64Image } from './imageData'

describe('decodeBase64Image', () => {
  it('decodes PNG data to the byte representation recommended by the SDK', () => {
    const bytes = decodeBase64Image('iVBORw0KGgo=')

    expect(Array.from(bytes)).toEqual([137, 80, 78, 71, 13, 10, 26, 10])
  })
})
