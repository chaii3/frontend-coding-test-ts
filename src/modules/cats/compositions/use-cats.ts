import { ref } from 'vue'
import CatsApi from '../cats-api'
import { Breed, CatImage } from '../cats-types'
import {
  notificationError,
  notificationSuccess,
} from '../../../services/notifications/notification'

export default function useCats() {
  const api = new CatsApi()

  const breeds = ref(new Map<Breed['id'], Breed>())
  const imagesByBreed = ref(new Map<Breed['id'], CatImage[]>())

  async function loadBreeds() {
    breeds.value.clear()

    const loaded = await api.getBreeds()

    loaded.forEach((item) => breeds.value.set(item.id, item))

    notificationSuccess('The breeds are loaded!')
  }

  async function loadImagesByBreed(breedId: Breed['id']) {
    if (!breedId) return

    if (!breeds.value.has(breedId)) {
      notificationError('Not valid breed')

      return
    }

    imagesByBreed.value.set(breedId, await api.getImagesByBreed(breedId))

    notificationSuccess('The images are loaded!')
  }

  return {
    loadBreeds,
    loadCatsByBreed: loadImagesByBreed,
    breeds,
    imagesByBreed,
  }
}
