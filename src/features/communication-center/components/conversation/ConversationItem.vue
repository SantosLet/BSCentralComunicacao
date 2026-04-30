<script setup lang="ts">
import { computed } from 'vue'

import { formatMessageTime, getLastMessage, getParticipantFirstName } from '../../helpers'
import { useCommunicationStore } from '../../store/useCommunicationStore'
import type { Conversation } from '../../types'

const props = defineProps<{
  conversation: Conversation
}>()

const communicationStore = useCommunicationStore()

const isActive = computed(() => {
  return communicationStore.selectedConversationId === props.conversation.id
})

const lastMessage = computed(() => {
  return getLastMessage(props.conversation)
})

const formattedLastMessageTime = computed(() => {
  if (!lastMessage.value) return ''

  return formatMessageTime(lastMessage.value.createdAt)
})

const previewMessage = computed(() => {
  if (props.conversation.isParticipantTyping) {
    return `${getParticipantFirstName(props.conversation.participant.name)}: Digitando...`
  }

  if (!lastMessage.value) {
    return 'Nenhuma mensagem enviada.'
  }

  if (lastMessage.value.senderType === 'system') {
    return lastMessage.value.content
  }

  return `${lastMessage.value.senderName}: ${lastMessage.value.content}`
})

function handleSelectConversation() {
  communicationStore.selectConversation(props.conversation.id)
}
</script>

<template>
  <button
    type="button"
    class="conversation-item"
    :class="{ 'is-active': isActive }"
    @click="handleSelectConversation"
  >
    <div class="profile-picture">
      <img
        class="picture"
        :src="conversation.participant.avatarUrl"
        :alt="`Foto de ${conversation.participant.name}`"
      />
    </div>

    <div class="conversation-content">
      <div class="conversation-header">
        <p class="author-name">{{ conversation.participant.name }}</p>

        <p class="message-date-hour">
          {{ formattedLastMessageTime }}
        </p>
      </div>

      <div class="conversation-footer">
        <p class="author-message">
          {{ previewMessage }}
        </p>

        <p v-if="conversation.unreadCount > 0" class="amount-notifications">
          {{ conversation.unreadCount }}
        </p>
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.conversation-item {
  text-align: left;
  width: 100%;
  background-color: transparent;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 0;
  cursor: pointer;
  transition: background-color 250ms ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &.is-active {
    background-color: $color-bg-gray;
  }

  .profile-picture {
    height: 42px;
    width: 42px;
    overflow: hidden;
    background-color: #e4e4e4;
    border-radius: 100%;

    .picture {
      height: 100%;
      width: 100%;
      display: block;
      object-fit: cover;
      border-radius: 100%;
    }
  }

  .conversation-content {
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0.25rem;
  }

  .conversation-header,
  .conversation-footer {
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    align-items: center;
    gap: 0.5rem;
  }

  .author-name {
    @include author-name;
    min-width: 0;
    margin: 0;
  }

  .author-message {
    @include text-secondary-regular;
    @include ellipsis;
    min-width: 0;
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.3;
  }

  .message-date-hour {
    @include text-primary-regular;
    font-size: 0.875rem;
    line-height: 1.2;
    white-space: nowrap;
    margin: 0;
  }

  .amount-notifications {
    @include center;
    color: #ffffff;
    font-size: 0.65rem;
    font-weight: 500;
    line-height: 1;
    height: 18px;
    min-width: 18px;
    background-color: $color-main;
    flex-shrink: 0;
    margin: 0;
    padding: 0 0.375rem;
    border-radius: 999px;
  }
}
</style>
