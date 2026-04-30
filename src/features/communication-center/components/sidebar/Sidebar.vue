<script setup lang="ts">
import { useCommunicationStore } from '../../store/useCommunicationStore'

import ArchivedSidebar from './ArchivedSidebar.vue'
import SidebarArchivedButton from './SidebarArchivedButton.vue'
import SidebarConversationList from './SidebarConversationList.vue'
import SidebarHeader from './SidebarHeader.vue'
import SidebarSearch from './SidebarSearch.vue'

const communicationStore = useCommunicationStore()
</script>

<template>
  <aside class="sidebar-messages">
    <SidebarHeader />

    <div class="communications-center-actions">
      <SidebarSearch />
      <SidebarArchivedButton />
    </div>

    <SidebarConversationList />

    <Transition name="archived-sidebar">
      <ArchivedSidebar v-if="communicationStore.isArchivedSidebarOpen" />
    </Transition>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar-messages {
  position: relative;
  height: 100vh;
  width: 18rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem max-content minmax(0, 1fr);
  border-right: 1px solid $color-border;
  background-color: $color-bg-white;
  overflow: hidden;

  .communications-center-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }

  .archived-sidebar-enter-active,
  .archived-sidebar-leave-active {
    transition:
      transform 350ms ease,
      opacity 350ms ease;
  }

  .archived-sidebar-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }

  .archived-sidebar-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .archived-sidebar-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .archived-sidebar-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
