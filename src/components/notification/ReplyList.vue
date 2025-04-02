<script setup lang="ts">
import ReplyItem from '@/components/notification/ReplyItem.vue'
import type { Notification, ReplyContent } from '@/types/notification'
import type { Ink } from '@/types/ink.ts'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  replies: {
    type: Array as () => Notification<Ink, ReplyContent>[],
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
    <ReplyItem v-for="reply in replies" :key="reply.id" :reply="reply" class="mb-2"></ReplyItem>
    <NoData v-if="replies.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
