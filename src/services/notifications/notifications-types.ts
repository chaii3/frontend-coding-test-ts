export enum NotificationType {
  Success = 1,
  Error,
}

export declare interface Notification {
  type: NotificationType
  text: string
  id: number
}
