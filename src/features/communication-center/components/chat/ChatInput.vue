<script setup lang="ts">
import { computed } from 'vue'
import { useCommunicationStore } from '../../store/useCommunicationStore'

const communicationStore = useCommunicationStore()

const characterCount = computed(() => {
  return communicationStore.draftMessage.length
})

const isAtLimit = computed(() => {
  return characterCount.value >= 2000
})

const canSendMessage = computed(() => {
  return communicationStore.draftMessage.trim().length > 0
})

function resizeTextarea(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

function resetTextarea(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto'
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement

  communicationStore.setDraftMessage(target.value)
  resizeTextarea(target)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter') return

  const target = event.target as HTMLTextAreaElement

  if (event.shiftKey) {
    resizeTextarea(target)
    return
  }

  event.preventDefault()

  if (!canSendMessage.value) return

  communicationStore.sendMessage()
  resetTextarea(target)
}

function handleSendMessage(event: MouseEvent) {
  if (!canSendMessage.value) return

  communicationStore.sendMessage()

  const button = event.currentTarget as HTMLButtonElement
  const messageBar = button.closest('.message-bar')
  const textarea = messageBar?.querySelector('textarea')

  if (textarea) {
    resetTextarea(textarea)
  }
}
</script>

<template>
  <div class="message-bar">
    <div class="message-action">
      <div class="container-text-area">
        <textarea
          id="input-message"
          name="message"
          placeholder="Escreva uma mensagem"
          rows="1"
          maxlength="2000"
          :value="communicationStore.draftMessage"
          @input="handleInput"
          @keydown="handleKeydown"
        />
      </div>

      <img src="/icons/attachment_icon_blue.svg" alt="Ícone anexar arquivo" />

      <button type="button" class="btn-send-message" @click="handleSendMessage">
        <span>Enviar</span>
        <img src="/icons/direct_icon_white.svg" alt="Ícone enviar" />
      </button>
    </div>

    <small>
      <span :class="{ 'is-limit': isAtLimit }">{{ characterCount }}/2000 caracteres</span>
      | Shift + Enter para adicionar uma nova linha
    </small>
  </div>
</template>

<style lang="scss" scoped>
.message-bar {
  padding: 1.5rem 1rem;
  border-top: 1px solid $color-border;
  background-color: $color-bg-white;

  @media (max-width: 63.9375rem) {
    padding: 1rem 0.75rem;
  }

  .message-action {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content max-content;
    align-items: center;
    gap: 1.5rem;
    background-color: $color-bg-white;

    @media (max-width: 63.9375rem) {
      gap: 0.75rem;
      grid-template-columns: minmax(0, 1fr) 1.5rem 2.25rem;
    }

    .container-text-area {
      width: 100%;
      min-width: 0;
      display: flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.4rem;
      box-shadow: $shadow-default;

      textarea {
        width: 100% !important;
        min-width: 0;
        min-height: 1.25rem;
        max-height: 5rem;
        overflow-y: auto;
        background-color: transparent;
        color: $color-text-primary;
        font-family: inherit;
        font-size: 0.875rem;
        line-height: 1.4;
        resize: none;
        border: 0;
        outline: 0;

        &::placeholder {
          color: $color-text-secondary;
        }
      }
    }

    & > img {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;

      @media (max-width: 63.9375rem) {
        justify-self: center;
      }
    }
  }

  .btn-send-message {
    @include center;
    height: 2.25rem;
    min-width: 2.25rem;
    flex-shrink: 0;
    gap: 0.5rem;
    padding: 0 0.875rem;
    border: 0;
    border-radius: 0.45rem;
    background-color: $color-main;
    color: #ffffff;
    cursor: pointer;
    opacity: 1;
    transition:
      background-color 250ms ease,
      transform 250ms ease;

    img {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    &:hover {
      background-color: $color-main;
    }

    &:active {
      transform: scale(0.98);
    }

    @media (max-width: 63.9375rem) {
      width: 2.25rem;
      min-width: 2.25rem;
      padding: 0;

      span {
        display: none;
      }
    }
  }

  small {
    @include text-secondary-regular;
    font-size: 0.75rem;
    display: block;
    margin-top: 0.5rem;

    @media (max-width: 63.9375rem) {
      font-size: 0.6875rem;
      line-height: 1.3;
    }

    .is-limit {
      color: #a92020;
      font-weight: 600;
    }
  }
}
</style>
