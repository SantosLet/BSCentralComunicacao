<script setup lang="ts">
import { computed } from 'vue'

import { useCommunicationStore } from '../../store/useCommunicationStore'

import ConversationItem from '../conversation/ConversationItem.vue'

const communicationStore = useCommunicationStore()

const hasSearchTerm = computed(() => {
  return communicationStore.searchTerm.trim().length > 0
})

const hasSearchResults = computed(() => {
  return communicationStore.filteredActiveConversations.length > 0
})

const hasActiveConversations = computed(() => {
  return communicationStore.activeConversations.length > 0
})

const shouldShowEmptySearch = computed(() => {
  return hasSearchTerm.value && !hasSearchResults.value
})

const shouldShowEmptyConversations = computed(() => {
  return !hasSearchTerm.value && !hasActiveConversations.value
})
</script>

<template>
  <div class="messages-contacts">
    <div v-if="shouldShowEmptySearch" class="empty-state">
      <img src="/icons/search_alert_icon_gray.svg" alt="Ícone de busca sem resultado" />

      <p>Nenhuma conversa encontrada</p>
    </div>

    <div v-else-if="shouldShowEmptyConversations" class="empty-state empty-state-text-only">
      <p>Nenhuma conversa disponível</p>
    </div>

    <TransitionGroup v-else name="conversation-list" tag="div" class="conversation-list">
      <ConversationItem
        v-for="conversation in communicationStore.filteredActiveConversations"
        :key="conversation.id"
        :conversation="conversation"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.messages-contacts {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.conversation-list {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.empty-state {
  color: #a6a7aa;
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  text-align: center;

  img {
    height: 2rem;
    width: 2rem;
  }

  p {
    @include text-secondary-regular;
    margin: 0;
    font-size: 0.875rem;
  }
}

.empty-state-text-only {
  min-height: 12rem;
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
