<template>
  <div
    v-bind:class="[
      'whitespace-pre-wrap',
      'flex',
      'items-center',
      'w-64',
      'bg-black',
      'opacity-60',
      'h-8',
      'text-white',
      'text-start',
      'rounded-r',
      'px-2',
      'transition-opacity',
      colors[type],
    ]"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { NotificationType } from '../services/notifications/notifications-types'

defineProps<{
  type: NotificationType
  text: string
}>()

const colors: Record<NotificationType, string> = {
  [NotificationType.Error]: 'bg-red-800',
  [NotificationType.Success]: 'bg-green-600',
}
</script>
