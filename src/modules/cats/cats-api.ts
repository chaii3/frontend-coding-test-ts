import axios from 'axios'
import { ApiBreed, Breed, CatImage } from './cats-types'

export default class CatsApi {
  private baseUrl = 'https://api.thecatapi.com/v1'

  public async getBreeds(): Promise<Breed[]> {
    const { data } = await axios.get<ApiBreed[]>(this.buildUrl('/breeds'))

    return data.map((breed) => ({
      id: breed.id,
      name: breed.name,
      description: breed.description,
      review: {
        health_issues: breed.health_issues,
        social_needs: breed.social_needs,
        stranger_friendly: breed.stranger_friendly,
      },
    }))
  }

  public async getImagesByBreed(id: Breed['id']) {
    const { data } = await axios.get<CatImage[]>(
      this.buildUrl(`/images/search?breed_ids=${id}&limit=4`),
    )

    return data.sort((a, b) => b.width - a.width)
  }

  private buildUrl(route: string) {
    return `${this.baseUrl}${route}`
  }
}
