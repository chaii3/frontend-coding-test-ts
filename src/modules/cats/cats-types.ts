export declare interface ApiBreed {
  weight: {
    imperial: string
    metric: string
  }
  id: string
  name: string
  cfa_url: string
  vetstreet_url: string
  vcahospitals_url: string
  temperament: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  indoor: number
  lap: number
  alt_names: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressed_tail: number
  short_legs: number
  wikipedia_url: string
  hypoallergenic: number
  reference_image_id: string
}

type BreedReview = Pick<
  ApiBreed,
  'health_issues' | 'social_needs' | 'stranger_friendly'
>

export type Breed = Pick<ApiBreed, 'id' | 'name' | 'description'> & {
  review: BreedReview
}

export declare interface CatImage {
  height: number
  width: number
  id: string
  url: string
}
