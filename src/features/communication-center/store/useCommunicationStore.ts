import { defineStore } from 'pinia'

import { conversationsMock } from '../conversations.mock'
import type { Conversation, Message } from '../types'
import { escapeRegex, getLastMessage, getParticipantFirstName } from '../helpers'

const NEW_MESSAGES_MARKER_DURATION = 2 * 60 * 1000

const markerTimers = new Map<number, number>()
const typingTimers = new Map<number, number>()

type State = {
  conversations: Conversation[]
  selectedConversationId: number | null
  searchTerm: string
  isArchivedSidebarOpen: boolean
  isMobileSidebarOpen: boolean
  draftMessage: string
  currentUser: {
    id: string
    name: string
    avatarUrl: string
  }
}

export const useCommunicationStore = defineStore('communication', {
  state: (): State => ({
    conversations: conversationsMock,
    selectedConversationId: conversationsMock[0]?.id ?? null,
    searchTerm: '',
    isArchivedSidebarOpen: false,
    isMobileSidebarOpen: false,
    draftMessage: '',
    currentUser: {
      id: 'me',
      name: 'Roberto Silva',
      avatarUrl: '/images/picture_roberto_silva.png',
    },
  }),

  getters: {
    selectedConversation: (state): Conversation | undefined => {
      return state.conversations.find(conversation => {
        return conversation.id === state.selectedConversationId
      })
    },

    activeConversations: (state): Conversation[] => {
      return state.conversations.filter(conversation => !conversation.isArchived)
    },

    archivedConversations: (state): Conversation[] => {
      return state.conversations.filter(conversation => conversation.isArchived)
    },

    filteredActiveConversations(): Conversation[] {
      const term = this.searchTerm.trim()

      if (!term) return this.activeConversations

      const regex = new RegExp(escapeRegex(term), 'i')

      return this.activeConversations.filter(conversation => {
        return regex.test(conversation.participant.name)
      })
    },

    isDraftAtLimit: (state): boolean => {
      return state.draftMessage.length >= 2000
    },
  },

  actions: {
    setSearchTerm(value: string) {
      this.searchTerm = value
    },

    setDraftMessage(value: string) {
      this.draftMessage = value.slice(0, 2000)
    },

    clearDraftMessage() {
      this.draftMessage = ''
    },

    openMobileSidebar() {
      this.isMobileSidebarOpen = true
    },

    closeMobileSidebar() {
      this.isMobileSidebarOpen = false
    },

    openArchivedSidebar() {
      this.isArchivedSidebarOpen = true
    },

    closeArchivedSidebar() {
      this.isArchivedSidebarOpen = false
    },

    selectConversation(conversationId: number) {
      if (this.selectedConversationId && this.selectedConversationId !== conversationId) {
        this.clearNewMessagesMarker(this.selectedConversationId)
      }

      const conversation = this.conversations.find(item => item.id === conversationId)

      if (!conversation) return

      this.selectedConversationId = conversationId
      this.isMobileSidebarOpen = false

      if (conversation.unreadCount > 0) {
        this.showNewMessagesMarker(conversationId)
      }

      conversation.unreadCount = 0

      conversation.messages = conversation.messages.map(message => ({
        ...message,
        visualized: true,
      }))
    },

    showNewMessagesMarker(conversationId: number) {
      const conversation = this.conversations.find(item => item.id === conversationId)

      if (!conversation) return

      conversation.newMessagesMarkerExpiresAt = Date.now() + NEW_MESSAGES_MARKER_DURATION

      const previousTimer = markerTimers.get(conversationId)

      if (previousTimer) {
        window.clearTimeout(previousTimer)
      }

      const timer = window.setTimeout(() => {
        this.clearNewMessagesMarker(conversationId)
      }, NEW_MESSAGES_MARKER_DURATION)

      markerTimers.set(conversationId, timer)
    },

    clearNewMessagesMarker(conversationId: number) {
      const conversation = this.conversations.find(item => item.id === conversationId)

      if (!conversation) return

      conversation.newMessagesMarkerExpiresAt = null

      const timer = markerTimers.get(conversationId)

      if (timer) {
        window.clearTimeout(timer)
        markerTimers.delete(conversationId)
      }
    },

    toggleArchiveSelectedConversation() {
      const currentConversation = this.selectedConversation

      if (!currentConversation) return

      const wasArchived = currentConversation.isArchived

      currentConversation.isArchived = !currentConversation.isArchived
      if (wasArchived) {
        this.selectedConversationId = currentConversation.id
        this.closeArchivedSidebar()
        this.closeMobileSidebar()
        return
      }

      const activeConversations = this.conversations.filter(conversation => {
        return !conversation.isArchived && conversation.id !== currentConversation.id
      })

      const nextConversation = activeConversations.reduce<Conversation | null>(
        (latest, conversation) => {
          if (!latest) return conversation

          const latestMessage = getLastMessage(latest)
          const currentMessage = getLastMessage(conversation)

          const latestTime = latestMessage ? new Date(latestMessage.createdAt).getTime() : 0
          const currentTime = currentMessage ? new Date(currentMessage.createdAt).getTime() : 0

          return currentTime > latestTime ? conversation : latest
        },
        null
      )

      this.selectedConversationId = nextConversation?.id ?? null
      this.closeArchivedSidebar()

      if (!nextConversation) {
        this.openMobileSidebar()
      }
    },

    sendMessage() {
      const content = this.draftMessage.trim()

      if (!content || !this.selectedConversation) return

      const conversationId = this.selectedConversation.id

      const message: Message = {
        id: Date.now(),
        conversationId,
        senderId: 'me',
        senderName: this.currentUser.name,
        senderType: 'me',
        content,
        createdAt: new Date().toISOString(),
        visualized: true,
      }

      this.selectedConversation.messages.push(message)
      this.clearDraftMessage()

      this.simulateParticipantReply(conversationId)
    },

    receiveMessage(conversationId: number, content: string) {
      const conversation = this.conversations.find(item => item.id === conversationId)

      if (!conversation) return

      const firstName = getParticipantFirstName(conversation.participant.name)

      const message: Message = {
        id: Date.now(),
        conversationId,
        senderId: conversation.participant.id,
        senderName: firstName,
        senderType: 'participant',
        content,
        createdAt: new Date().toISOString(),
        visualized: this.selectedConversationId === conversationId,
      }

      conversation.messages.push(message)

      if (this.selectedConversationId === conversationId) {
        this.showNewMessagesMarker(conversationId)
      } else {
        conversation.unreadCount += 1
      }
    },

    setParticipantTyping(conversationId: number, value: boolean) {
      const conversation = this.conversations.find(item => item.id === conversationId)

      if (!conversation) return

      conversation.isParticipantTyping = value
    },

    simulateParticipantReply(conversationId: number) {
      const previousTypingTimer = typingTimers.get(conversationId)

      if (previousTypingTimer) {
        window.clearTimeout(previousTypingTimer)
      }

      this.setParticipantTyping(conversationId, true)

      const timer = window.setTimeout(() => {
        this.setParticipantTyping(conversationId, false)

        const replies = [
          'Perfeito, vou verificar isso agora.',
          'Entendi, obrigado pelo retorno.',
          'Certo, podemos seguir assim então.',
          'Vou alinhar com a equipe e te aviso.',
          'Combinado, fico no aguardo.',
        ]

        const randomReply = replies[Math.floor(Math.random() * replies.length)]

        this.receiveMessage(conversationId, randomReply)
      }, 1800)

      typingTimers.set(conversationId, timer)
    },

    getConversationLastMessage(conversation: Conversation) {
      return getLastMessage(conversation)
    },
  },
})
