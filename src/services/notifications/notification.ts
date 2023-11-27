import { ref } from 'vue'
import { Notification, NotificationType } from './notifications-types'

const DEFAULT_DURATION = 2500

export const notificationsQueue = ref(new Map<number, Notification>())

export function add(notification: Notification, duration: number) {
  const id = Date.now()

  notificationsQueue.value.set(id, notification)

  setTimeout(() => {
    notificationsQueue.value.delete(id)
  }, duration)
}

export function notificationError(text: string, duration = DEFAULT_DURATION) {
  add({ text, type: NotificationType.Error }, duration)
}

export function notificationSuccess(text: string, duration = DEFAULT_DURATION) {
  add({ text, type: NotificationType.Success }, duration)
}
