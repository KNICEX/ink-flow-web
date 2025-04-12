<script setup lang="ts">
import type { Notification } from '@/types/notification.ts'
import FollowItem from '@/components/notification/FollowItem.vue'
import NoData from '@/components/empty/NoData.vue'
import InkLoading from '@/components/loading/InkLoading.vue'
defineProps({
  follows: {
    type: Array as () => Notification<never, never>[],
    default: () => [],
  },
  loadMore: {
    type: Function,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div v-infinite-scroll="loadMore">
    <FollowItem v-for="follow in follows" :notification="follow" :key="follow.id"></FollowItem>
    <InkLoading v-show="loading"></InkLoading>
    <NoData v-show="!loading && follows.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
