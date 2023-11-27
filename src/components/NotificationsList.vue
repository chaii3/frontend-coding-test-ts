<template>
  <TransitionGroup
    v-show="notificationsQueue.size"
    tag="div"
    name="notification"
    class="fixed top-20 flex flex-col gap-2"
  >
    <Notification
      v-for="[id, { text, type }] in notificationsQueue"
      v-bind:key="id"
      v-bind:text="text"
      v-bind:type="type"
    ></Notification>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import Notification from './Notification.vue'
import { notificationsQueue } from '../services/notifications/notification'
</script>

<style lang="css">
.notification-move,
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}

.notification-enter-from {
  opacity: 0;
  transform: translate(-300px);
}
</style>
