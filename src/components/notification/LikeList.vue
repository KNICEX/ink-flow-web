<script setup lang="ts">
import LikeItem from '@/components/notification/LikeItem.vue'
import type { MergedLike } from '@/types/notification.ts'
import type { Comment } from '@/types/comment.ts'
import type { Ink } from '@/types/ink.ts'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  mergedLikes: {
    type: Array as () => MergedLike<Comment | Ink>[],
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
    <LikeItem
      class="mb-2"
      v-for="(like, idx) in mergedLikes"
      :mergedLike="like"
      :key="idx"
    ></LikeItem>
    <NoData v-if="mergedLikes.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
