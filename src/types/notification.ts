interface Notification<T> {
  id: number
  recipientId: number
  senderId: number
  subjectType: SubjectType
  subjectId: number
  notificationType: NotificationType
  content: T
  read: boolean
  createdAt: Date
}

enum NotificationType {
  Like = 'like',
  Reply = 'reply',
  Follow = 'follow',
  System = 'system',
  Mention = 'mention',
  Subscribe = 'subscribe',
}

enum SubjectType {
  Ink = 'ink',
  Comment = 'comment',
  User = 'user',
  System = 'system',
}
