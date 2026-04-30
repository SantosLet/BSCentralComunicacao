<script setup lang="ts">
import { useCommunicationStore } from '../../store/useCommunicationStore'

const communicationStore = useCommunicationStore()
</script>

<template>
  <button
    type="button"
    class="archived-conversations-button"
    @click="communicationStore.openArchivedSidebar"
  >
    <img src="/icons/archive_icon_gray.svg" alt="Ícone arquivar" />
    <span> Conversas Arquivadas </span>
  </button>
</template>

<style lang="scss" scoped>
.archived-conversations-button {
  text-align: left;
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.75rem;
  border: 0;
  border-radius: 0.35rem;
  cursor: pointer;
  transition: 350ms;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    flex-shrink: 0;
  }

  span {
    @include text-secondary-medium;
    @include ellipsis;
    font-size: 0.85rem;
    min-width: 0;
  }
}
</style>
