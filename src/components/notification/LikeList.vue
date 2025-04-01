<script setup lang="ts">
import LikeItem from '@/components/notification/LikeItem.vue'
import type { MergedLike } from '@/types/notification.ts'
import type { Comment } from '@/types/comment.ts'
import type { Ink } from '@/types/ink.ts'
defineProps({
  mergedLikes: {
    type: Array as () => MergedLike<Comment | Ink>[],
    default: () => [],
  },
})
</script>

<template>
  <div>
    <LikeItem
      class="mb-2"
      v-for="(like, idx) in mergedLikes"
      :mergedLike="like"
      :key="idx"
    ></LikeItem>
  </div>
</template>

<style scoped lang="scss"></style>
