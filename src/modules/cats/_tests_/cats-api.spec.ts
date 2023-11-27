import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import CatsApi from '../cats-api'
import { generateImages, generateMockBreed } from './mocks'

vi.mock('axios')

const baseUrl = 'https://api.thecatapi.com/v1'

describe('cats api', () => {
  it('works with breeds request', async () => {
    const api = new CatsApi()

    const generated = generateMockBreed()

    const mockValue = new Promise((resolve) => {
      resolve({ data: [generateMockBreed()] })
    })

    vi.mocked(axios.get).mockReturnValue(mockValue)

    const result = await api.getBreeds()

    expect(axios.get).toBeCalledWith(`${baseUrl}/breeds`)
    expect(axios.get).toBeCalledTimes(1)

    expect(result).toEqual([
      {
        name: generated.name,
        id: generated.id,
        description: generated.description,
        review: {
          health_issues: generated.health_issues,
          social_needs: generated.social_needs,
          stranger_friendly: generated.stranger_friendly,
        },
      },
    ])
  })

  it('works with images request', async () => {
    const api = new CatsApi()

    const generated = generateImages()

    const mockValue = new Promise((resolve) => {
      resolve({ data: generated })
    })

    vi.mocked(axios.get).mockReturnValue(mockValue)

    const id = 'acur'

    const result = await api.getImagesByBreed(id)

    expect(axios.get).toBeCalledWith(
      `${baseUrl}/images/search?breed_ids=${id}&limit=4`,
    )
    expect(axios.get).toBeCalledTimes(1)

    expect(result).toEqual(generated)
  })
})
