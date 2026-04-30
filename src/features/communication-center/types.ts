export type MessageSenderType = 'me' | 'participant' | 'system'

export type Participant = {
  id: string
  name: string
  avatarUrl: string
}

export type Message = {
  id: number
  conversationId: number
  senderId: string
  senderName: string
  senderType: MessageSenderType
  content: string
  createdAt: string
  visualized?: boolean
}

export type Conversation = {
  id: number
  participant: Participant
  messages: Message[]
  unreadCount: number
  isArchived: boolean
  isParticipantTyping: boolean
  newMessagesMarkerExpiresAt?: number | null
}
