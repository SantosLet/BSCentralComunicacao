<script setup lang="ts">
import { useCommunicationStore } from '../../store/useCommunicationStore'

const communicationStore = useCommunicationStore()

function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement

  communicationStore.setSearchTerm(target.value)
}
</script>

<template>
  <div class="search-conversations">
    <img src="/icons/magnifier_icon_gray.svg" alt="Ícone Lupa" />

    <input
      id="input-search-contact"
      type="text"
      name="search-conversation"
      placeholder="Buscar conversas"
      :value="communicationStore.searchTerm"
      @input="handleSearch"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-conversations {
  height: 2rem;
  background-color: $color-bg-gray;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.75rem;
  border-radius: 0.35rem;

  img {
    flex-shrink: 0;
  }

  input {
    width: 100%;
    min-width: 0;
    color: $color-text-primary;
    font-size: 0.85rem;
    background-color: transparent;
    border: 0;
    outline: 0;

    &::placeholder {
      color: #475569;
      font-weight: 500;
    }
  }
}
</style>
