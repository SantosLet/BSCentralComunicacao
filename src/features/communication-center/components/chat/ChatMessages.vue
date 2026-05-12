<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import { formatMessageDate, formatMessageTime, getParticipantFirstName } from '../../helpers'
import { useCommunicationStore } from '../../store/useCommunicationStore'

const communicationStore = useCommunicationStore()

const contentMessagesRef = ref<HTMLDivElement | null>(null)

const selectedConversation = computed(() => {
  return communicationStore.selectedConversation
})

const selectedConversationId = computed(() => {
  return selectedConversation.value?.id ?? null
})

const messagesLength = computed(() => {
  return selectedConversation.value?.messages.length ?? 0
})

const isParticipantTyping = computed(() => {
  return selectedConversation.value?.isParticipantTyping ?? false
})

const shouldShowNewMessagesMarker = computed(() => {
  if (!selectedConversation.value?.newMessagesMarkerExpiresAt) return false

  return Date.now() < selectedConversation.value.newMessagesMarkerExpiresAt
})

function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
  nextTick(() => {
    if (!contentMessagesRef.value) return

    contentMessagesRef.value.scrollTo({
      top: contentMessagesRef.value.scrollHeight,
      behavior,
    })
  })
}

watch([selectedConversationId, messagesLength, isParticipantTyping], () => {
  scrollToBottom()
})

onMounted(() => {
  scrollToBottom('auto')
})
</script>

<template>
  <div v-if="selectedConversation" ref="contentMessagesRef" class="content-messages">
    <div class="messages-bottom-wrapper">
      <div class="date-messages">
        <p class="date">Hoje, {{ formatMessageDate(new Date().toISOString()) }}</p>
        <div class="separator-line"></div>
      </div>

      <p class="default-chat-warning">
        Todas as conversas podem ser visualizadas pelo gestor do sistema para fins de autoria
        institucional.
      </p>

      <div class="chat-messages">
        <div v-if="shouldShowNewMessagesMarker" class="new-messages-marker">Novas mensagens</div>

        <div
          v-for="message in selectedConversation.messages"
          :key="message.id"
          class="message-content"
          :class="{
            'my-message': message.senderType === 'me',
            'user-message': message.senderType === 'participant',
            'system-message': message.senderType === 'system',
          }"
        >
          <div v-if="message.senderType !== 'system'" class="profile-picture">
            <img
              class="picture"
              :src="
                message.senderType === 'me'
                  ? communicationStore.currentUser.avatarUrl
                  : selectedConversation.participant.avatarUrl
              "
              :alt="`Foto de ${message.senderName}`"
            />
          </div>

          <div class="message-body">
            <p v-if="message.senderType !== 'system'" class="author-name">
              {{ message.senderName }}
            </p>

            <div class="information-message">
              <p class="message">{{ message.content }}</p>
            </div>

            <p class="message-hour">{{ formatMessageTime(message.createdAt) }}</p>
          </div>
        </div>

        <div
          v-if="selectedConversation.isParticipantTyping"
          class="message-content user-message typing-message"
        >
          <div class="profile-picture">
            <img
              class="picture"
              :src="selectedConversation.participant.avatarUrl"
              :alt="`Foto de ${selectedConversation.participant.name}`"
            />
          </div>

          <div class="message-body">
            <p class="author-name">
              {{ getParticipantFirstName(selectedConversation.participant.name) }}
            </p>

            <div class="information-message">
              <p class="message typing-bubble">
                Digitando

                <span class="typing-dots" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-messages {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.messages-bottom-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.date-messages {
  @include center;
  position: relative;
  padding: 2.25rem 0;

  .date {
    @include text-primary-bold;
    position: absolute;
    z-index: 2;
    background-color: $color-bg-white;
    font-size: 0.75rem;
    margin: 0;
    padding: 0.25rem 0.5rem;
  }

  .separator-line {
    @include separator;
    @include center;
  }
}

.default-chat-warning {
  @include warning;
  margin-bottom: 1.5rem;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.new-messages-marker {
  color: $color-text-secondary;
  font-size: 0.75rem;
  font-weight: 500;
  align-self: center;
  background-color: #f1f5f9;
  margin-top: 0.75rem;
  padding: 0.35rem 1rem;
  border-radius: 999px;
}

.message-content {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 0.75rem;
  width: fit-content;
  max-width: min(72%, 42rem);

  .profile-picture {
    height: 28px;
    width: 28px;
    background-color: #e4e4e4;
    flex-shrink: 0;
    border-radius: 100%;
    overflow: hidden;

    .picture {
      height: 100%;
      width: 100%;
      display: block;
      object-fit: cover;
      border-radius: 100%;
    }
  }

  .message-body {
    min-width: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .author-name {
    @include author-name;
    @include ellipsis;
    max-width: 100%;
    margin: 0 0 6px;
  }

  .information-message {
    min-width: 0;
    max-width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid $color-border;
    border-radius: 0.5rem;
    box-shadow: $shadow-default;
    overflow-wrap: anywhere;
    word-break: break-word;

    .message {
      color: $color-other-message-text;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      margin: 0;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
  }

  .message-hour {
    @include text-secondary-regular;
    margin: 0.375rem 0 0;
    font-size: 0.75rem;
    opacity: 0.75;
  }
}

.my-message {
  align-self: flex-end;
  grid-template-columns: minmax(0, 1fr) 28px;

  .profile-picture {
    grid-column: 2;
    grid-row: 1;
    display: block;
  }

  .message-body {
    grid-column: 1;
    grid-row: 1;
    align-items: flex-end;
  }

  .author-name,
  .message-hour {
    text-align: right;
  }

  .information-message {
    color: $color-my-message-text;
    background-color: $color-my-message-background;
    border-color: $color-my-message-background;

    .message {
      color: $color-my-message-text;
    }
  }
}

.user-message {
  align-self: flex-start;

  .message-body {
    align-items: flex-start;
  }

  .information-message {
    color: $color-other-message-text;
    background-color: $color-other-message-background;
  }
}

.system-message {
  align-self: center;
  max-width: min(80%, 42rem);
  grid-template-columns: 1fr;

  .message-body {
    align-items: center;
  }

  .information-message {
    text-align: center;
    color: $color-text-secondary;
    background-color: transparent;
    border-color: transparent;

    .message {
      color: $color-text-secondary;
    }
  }

  .message-hour {
    text-align: center;
  }
}

.typing-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin-left: 0.2rem;

  span {
    height: 4px;
    width: 4px;
    border-radius: 100%;
    background-color: currentColor;
    animation: typing-dot 900ms infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 150ms;
    }

    &:nth-child(3) {
      animation-delay: 300ms;
    }
  }
}

@keyframes typing-dot {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }

  40% {
    transform: translateY(-1px);
    opacity: 1;
  }
}
</style>
