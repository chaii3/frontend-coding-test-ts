<template>
  <article
    class="justify-center mt-10 flex justify-center items-center flex-col"
  >
    <h1 class="font-extrabold tracking-tigh text-3xl leading-10 mb-3">
      Exploring of cats breeds
    </h1>

    <div v-if="breeds.size">
      <select
        name="cats_breed_select"
        v-bind:class="[
          'bg-gray-50',
          'border border-gray-300',
          'text-gray-900',
          'text-sm rounded-lg',
          'focus:ring-blue-500',
          'focus:border-blue-500',
          'block w-full',
          'p-2.5',
          'dark:bg-gray-700',
          'dark:border-gray-600',
          'dark:placeholder-gray-400',
          'dark:text-white',
          'dark:focus:ring-blue-500',
          'dark:focus:border-blue-500',
        ]"
        v-on:change="onSelect"
      >
        <option v-for="[id, breed] in breeds" v-bind:key="id" v-bind:value="id">
          {{ breed.name }}
        </option>
      </select>
    </div>

    <section v-if="targetBreed" class="max-w-md">
      <h2 class="font-bold tracking-tigh text-xl leading-10 mt-3">
        {{ targetBreed.name }}
      </h2>

      <div class="flex gap-2 py-2 justify-center items-center flex-wrap">
        <h3
          v-for="(grade, title) in targetBreed.review"
          v-bind:key="title"
          class="font-bold"
        >
          {{ modifyGradeTitle(String(title)) }}: {{ grade }}/5
        </h3>
      </div>

      <p>{{ targetBreed.description }}</p>
    </section>

    <section
      class="mt-5 gap-2 flex-wrap w-full grid grid-cols-1 md:grid-cols-2 px-4"
    >
      <img
        v-for="image in images"
        v-bind:key="image.id"
        v-bind:src="image.url"
        v-bind:height="image.height"
        width="500"
      />
    </section>
  </article>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useCats from '../compositions/use-cats'
import { Breed } from '../cats-types'
import { notificationSuccess } from '../../../services/notifications/notification'

const route = useRoute()
const router = useRouter()

const { breeds, imagesByBreed, ...action } = useCats()

const targetBreed = computed<Breed | undefined>(() => {
  const { query } = route

  return breeds.value.get(query.breed)
})

const images = computed(() => {
  const { query } = route

  return imagesByBreed.value.get(query.breed) || []
})

function onSelect(event: Event) {
  router.push({
    ...router.currentRoute,
    query: {
      breed: event.target.value,
    },
  })
}

function modifyGradeTitle(gradeTitle: string) {
  return gradeTitle.split('_').join(' ')
}

onBeforeMount(async () => {
  await action.loadBreeds()

  if (route.query.breed) {
    await action.loadCatsByBreed(route.query.breed)
  }
})

watch(
  () => route.query.breed,
  () => action.loadCatsByBreed(route.query.breed),
)
</script>
