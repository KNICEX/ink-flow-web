<script setup lang="ts">
import type { Notification } from '@/types/notification.ts'
import SystemItem from '@/components/notification/SystemItem.vue'
defineProps({
  notifications: {
    type: Array as () => Notification<never, string>[],
    default: () => [],
  },
})
</script>

<template>
  <div>
    <SystemItem
      class="mb-2"
      v-for="(no, idx) in notifications"
      :key="idx"
      :notification="no"
    ></SystemItem>
  </div>
</template>

<style scoped lang="scss"></style>
