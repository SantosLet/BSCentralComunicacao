<script setup lang="ts">
import { computed } from 'vue'

import { useCommunicationStore } from '../../store/useCommunicationStore'

import ConversationItem from '../conversation/ConversationItem.vue'

const communicationStore = useCommunicationStore()

const hasArchivedConversations = computed(() => {
  return communicationStore.archivedConversations.length > 0
})
</script>

<template>
  <aside class="archived-sidebar">
    <header class="header-archived-sidebar">
      <button
        type="button"
        class="button-back"
        aria-label="Voltar para conversas"
        @click="communicationStore.closeArchivedSidebar"
      >
        <img src="/icons/chevron_left_icon_gray.svg" alt="Voltar para conversas" />
      </button>

      <div class="archived-sidebar-title">
        <img src="/icons/archive_icon_gray.svg" alt="" />
        <p>Arquivadas</p>
      </div>
    </header>

    <div class="archived-messages-contacts">
      <p v-if="!hasArchivedConversations" class="empty-archived-state">Pasta vazia</p>

      <TransitionGroup v-else name="conversation-list" tag="div" class="archived-conversation-list">
        <ConversationItem
          v-for="conversation in communicationStore.archivedConversations"
          :key="conversation.id"
          :conversation="conversation"
        />
      </TransitionGroup>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.archived-sidebar {
  position: absolute;
  inset: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  background-color: $color-bg-white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem minmax(0, 1fr);
  overflow: hidden;
}

.header-archived-sidebar {
  height: 5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  border-bottom: 1px solid $color-border;
}

.button-back {
  @include center;
  height: 2rem;
  width: 2rem;
  background-color: transparent;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 250ms ease;

  &:hover {
    background-color: #f4f4f4;
  }

  img {
    height: 1.125rem;
    width: 1.125rem;
  }
}

.archived-sidebar-title {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img {
    flex-shrink: 0;
  }

  p {
    @include text-primary-medium;
    @include ellipsis;
    font-size: 0.85rem;
    line-height: 1.2;
    min-width: 0;
    margin: 0;
  }
}

.archived-messages-contacts {
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.archived-conversation-list {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.empty-archived-state {
  color: #a6a7aa;
  text-align: center;
  font-size: 0.875rem;
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2rem 1rem;
}

.conversation-list-enter-active,
.conversation-list-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease,
    max-height 250ms ease;
}

.conversation-list-enter-from,
.conversation-list-leave-to {
  opacity: 0;
  transform: translateX(-0.75rem);
  max-height: 0;
}

.conversation-list-enter-to,
.conversation-list-leave-from {
  opacity: 1;
  transform: translateX(0);
  max-height: 5rem;
}

.conversation-list-move {
  transition: transform 250ms ease;
}
</style>
