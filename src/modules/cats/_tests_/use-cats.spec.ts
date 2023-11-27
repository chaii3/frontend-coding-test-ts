import { beforeEach, describe, expect, it, vi } from 'vitest'
import useCats from '../compositions/use-cats'
import { generateMockBreed, generateImages } from './mocks'

describe('use cats', () => {
  beforeEach(() => {
    vi.mock('../cats-api.ts', () => {
      const mockApi = vi.fn()

      const breedsValue = new Promise((res) => {
        res([
          {
            weight: {
              imperial: '7  -  10',
              metric: '3 - 5',
            },
            id: 'abys',
            name: 'Abyssinian',
            cfa_url: 'http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx',
            vetstreet_url: 'http://www.vetstreet.com/cats/abyssinian',
            vcahospitals_url:
              'https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian',
            temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
            origin: 'Egypt',
            country_codes: 'EG',
            country_code: 'EG',
            description: 'description.',
            life_span: '14 - 15',
            indoor: 0,
            lap: 1,
            alt_names: '',
            adaptability: 5,
            affection_level: 5,
            child_friendly: 3,
            dog_friendly: 4,
            energy_level: 5,
            grooming: 1,
            health_issues: 2,
            intelligence: 5,
            shedding_level: 2,
            social_needs: 5,
            stranger_friendly: 5,
            vocalisation: 1,
            experimental: 0,
            hairless: 0,
            natural: 1,
            rare: 0,
            rex: 0,
            suppressed_tail: 0,
            short_legs: 0,
            wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)',
            hypoallergenic: 0,
            reference_image_id: '0XYvRd7oD',
          },
        ])
      })

      const imagesValue = new Promise((res) => {
        res([
          {
            id: 'bTo6m3PVg',
            url: 'https://cdn2.thecatapi.com/images/bTo6m3PVg.jpg',
            width: 2000,
            height: 1138,
          },
          {
            id: 'kxUakBB2o',
            url: 'https://cdn2.thecatapi.com/images/kxUakBB2o.jpg',
            width: 1250,
            height: 650,
          },
        ])
      })

      mockApi.prototype.getBreeds = vi.fn().mockReturnValue(breedsValue)
      mockApi.prototype.getImagesByBreed = vi.fn().mockReturnValue(imagesValue)

      return { default: mockApi }
    })
  })

  it('works with loading breeds', async () => {
    const generated = generateMockBreed()

    const cats = useCats()

    await cats.loadBreeds()

    const expectedBreedsMap = new Map()

    expectedBreedsMap.set(generated.id, generated)

    expect(cats.breeds.value).toEqual(expectedBreedsMap)
  })

  it('works with loading breeds', async () => {
    const cats = useCats()

    const generatedBreed = generateMockBreed()

    await cats.loadBreeds()
    await cats.loadCatsByBreed(generatedBreed.id)

    const expectedMap = new Map()

    expectedMap.set(generatedBreed.id, generateImages())

    expect(cats.imagesByBreed.value).toEqual(expectedMap)
  })
})
