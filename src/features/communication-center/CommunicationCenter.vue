<script setup lang="ts">
import { useCommunicationStore } from './store/useCommunicationStore'

import Sidebar from './components/sidebar/Sidebar.vue'
import ChatPanel from './components/chat/ChatPanel.vue'

const communicationStore = useCommunicationStore()
</script>

<template>
  <main class="bs-communications-center">
    <div class="desktop-sidebar">
      <Sidebar />
    </div>

    <Transition name="mobile-sidebar">
      <div v-if="communicationStore.isMobileSidebarOpen" class="mobile-sidebar">
        <Sidebar />
      </div>
    </Transition>

    <div
      v-if="communicationStore.isMobileSidebarOpen"
      class="mobile-sidebar-backdrop"
      @click="communicationStore.closeMobileSidebar"
    />

    <ChatPanel />
  </main>
</template>

<style lang="scss" scoped>
.bs-communications-center {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: $color-bg-white;

  @media (min-width: $breakpoint-lg) {
    display: grid;
    grid-template-columns: 18rem minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }
}

.desktop-sidebar {
  display: none;

  @media (min-width: $breakpoint-lg) {
    display: block;
    min-height: 0;
  }
}

.mobile-sidebar {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 30;
  width: 18rem;
  height: 100vh;
  background-color: $color-bg-white;

  @media (min-width: $breakpoint-lg) {
    display: none;
  }
}

.mobile-sidebar-backdrop {
  position: absolute;
  inset: 0;
  z-index: 20;
  background-color: rgba(15, 23, 42, 0.35);

  @media (min-width: $breakpoint-lg) {
    display: none;
  }
}

.mobile-sidebar-enter-active,
.mobile-sidebar-leave-active {
  transition:
    transform 350ms ease,
    opacity 350ms ease;
}

.mobile-sidebar-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.mobile-sidebar-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.mobile-sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.mobile-sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
