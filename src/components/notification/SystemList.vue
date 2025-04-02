<script setup lang="ts">
import type { Notification } from '@/types/notification.ts'
import SystemItem from '@/components/notification/SystemItem.vue'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  notifications: {
    type: Array as () => Notification<never, string>[],
    default: () => [],
  },
  loadMore: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <div v-infinite-scroll="loadMore">
    <SystemItem
      class="mb-2"
      v-for="(no, idx) in notifications"
      :key="idx"
      :notification="no"
    ></SystemItem>
    <NoData v-if="notifications.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
