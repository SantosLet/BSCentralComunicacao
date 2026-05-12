<script setup lang="ts">
import { computed } from 'vue'
import { useCommunicationStore } from '../../store/useCommunicationStore'

const communicationStore = useCommunicationStore()

const selectedConversation = computed(() => {
  return communicationStore.selectedConversation
})

const archiveButtonLabel = computed(() => {
  return selectedConversation.value?.isArchived ? 'Desarquivar' : 'Arquivar'
})

const archiveButtonIconAlt = computed(() => {
  return selectedConversation.value?.isArchived ? 'Ícone desarquivar' : 'Ícone arquivar'
})
</script>

<template>
  <div v-if="selectedConversation" class="header-info-contact">
    <div class="contact-info-btn-back">
      <button
        type="button"
        class="open-sidebar-button"
        aria-label="Abrir conversas"
        @click="communicationStore.openMobileSidebar"
      >
        <img src="/icons/chevron_left_icon_gray.svg" alt="Voltar para conversas" />
      </button>

      <div class="contact-info">
        <div class="profile-picture">
          <img
            class="picture"
            :src="selectedConversation.participant.avatarUrl"
            :alt="`Foto de ${selectedConversation.participant.name}`"
          />
        </div>

        <div class="contact-text">
          <p class="author-name">
            {{ selectedConversation.participant.name }}
          </p>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="archive-button"
      @click="communicationStore.toggleArchiveSelectedConversation"
    >
      <img src="/icons/archive_icon_gray.svg" :alt="archiveButtonIconAlt" />
      {{ archiveButtonLabel }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header-info-contact {
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  border-bottom: 1px solid $color-border;

  .contact-info-btn-back {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .open-sidebar-button {
    @include center;
    height: 2.25rem;
    width: 2.25rem;
    background-color: $color-bg-white;
    flex-shrink: 0;
    padding: 0;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 250ms ease;

    &:hover {
      background-color: #f4f4f4;
    }

    @media (min-width: $breakpoint-sm) {
      display: none;
    }

    img {
      height: 1.125rem;
      width: 1.125rem;
    }
  }

  .contact-info {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
}

.profile-picture {
  height: 42px;
  width: 42px;
  background-color: #e4e4e4;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 100%;

  .picture {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: 100%;
  }
}

.contact-text {
  min-width: 0;

  .author-name {
    @include text-primary-medium;
    @include ellipsis;
    margin: 0;
  }

  .contact-status,
  .typing-status {
    @include text-secondary-regular;
    margin: 0.25rem 0 0;
    font-size: 0.8125rem;
  }
}

.archive-button {
  @include text-secondary-medium;
  height: 2.5rem;
  background-color: $color-bg-white;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border: 1px solid $color-border;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 250ms ease;

  &:hover {
    background-color: #f5f5f5;
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
    transform: translateY(-4px);
    opacity: 1;
  }
}
</style>
