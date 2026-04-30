<script setup lang="ts">
import { useCommunicationStore } from '../../store/useCommunicationStore'

import ChatHeader from './ChatHeader.vue'
import ChatInput from './ChatInput.vue'
import ChatMessages from './ChatMessages.vue'

const communicationStore = useCommunicationStore()
</script>

<template>
  <section class="chat-panel">
    <template v-if="communicationStore.selectedConversation">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </template>

    <template v-else>
      <header class="empty-chat-header">
        <button
          type="button"
          class="open-sidebar-button"
          aria-label="Abrir conversas"
          @click="communicationStore.openMobileSidebar"
        >
          <img src="/icons/menu_icon_gray.svg" alt="" />
        </button>

        <p>Central de Comunicação</p>
      </header>

      <div class="empty-chat">
        <p>Selecione uma conversa para começar.</p>
      </div>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.chat-panel {
  height: 100vh;
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem minmax(0, 1fr) max-content;
  background-color: $color-bg-white;
}

.empty-chat-header {
  height: 5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  border-bottom: 1px solid $color-border;

  p {
    @include text-primary-medium;
    margin: 0;
    font-size: 0.875rem;
  }
}

.open-sidebar-button {
  @include center;
  flex-shrink: 0;
  height: 2.25rem;
  width: 2.25rem;
  padding: 0;
  border: 1px solid $color-border;
  border-radius: 0.5rem;
  background-color: $color-bg-white;
  cursor: pointer;
  transition: background-color 250ms ease;

  &:hover {
    background-color: #f4f4f4;
  }

  @media (min-width: $breakpoint-lg) {
    display: none;
  }

  img {
    height: 1.125rem;
    width: 1.125rem;
  }
}

.empty-chat {
  @include center;
  min-height: 0;
  padding: 1rem;
  color: $color-text-secondary;

  p {
    margin: 0;
    font-size: 0.875rem;
  }
}
</style>
