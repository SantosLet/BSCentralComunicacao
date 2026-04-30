import type { Conversation, Message } from './types'

export function getLastMessage(conversation: Conversation): Message | undefined {
  return [...conversation.messages].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })[0]
}

export function formatMessageTime(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatMessageDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(date))
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function getParticipantFirstName(name: string): string {
  return name.trim().split(' ')[0] ?? name
}
