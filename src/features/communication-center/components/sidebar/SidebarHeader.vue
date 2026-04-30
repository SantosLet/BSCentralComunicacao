<script setup lang="ts"></script>

<template>
  <div class="header-sidebar">
    <div class="title-subtitle-sidebar">
      <p>Central de Comunicação</p>
      <p>Comunicação Interna</p>
    </div>

    <img src="/icons/chat_plus_icon_blue.svg" alt="Chat - Central de Comunicação" />
  </div>
</template>

<style lang="scss" scoped>
.header-sidebar {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid $color-border;
}

.title-subtitle-sidebar {
  min-width: 0;
  display: flex;
  flex-direction: column;

  p {
    @include ellipsis;
    margin: 0;
  }

  p:first-child {
    @include text-primary-medium;
    font-size: 1.125rem;
    line-height: 1.625;
  }

  p:last-child {
    @include text-secondary-regular;
    font-size: 0.875rem;
    line-height: 1.375;
  }
}
</style>
