<script setup lang="ts">
import { demoComments } from '@/mock/demo_data.ts'
import CommentItem from '@/components/list/comment/CommentItem.vue'
import type { Comment } from '@/types/comment.ts'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  comments: {
    type: Array as () => Comment[],
    default: () => demoComments(10, false),
  },
})
</script>

<template>
  <div>
    <CommentItem
      v-for="comment in comments"
      :comment="comment"
      :key="comment.id"
      :reply-able="false"
    ></CommentItem>
    <NoData v-if="comments.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
