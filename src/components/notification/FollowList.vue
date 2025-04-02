<script setup lang="ts">
import type { Notification } from '@/types/notification.ts'
import FollowItem from '@/components/notification/FollowItem.vue'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  follows: {
    type: Array as () => Notification<never, never>[],
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
    <FollowItem v-for="follow in follows" :notification="follow" :key="follow.id"></FollowItem>
    <NoData v-if="follows.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
