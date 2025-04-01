<script setup lang="ts">
import ReplyItem from '@/components/notification/ReplyItem.vue'
import type { Notification, ReplyContent } from '@/types/notification'
import type { Ink } from '@/types/ink.ts'
defineProps({
  replies: {
    type: Array as () => Notification<Ink, ReplyContent>[],
    default: () => [],
  },
})
</script>

<template>
  <div>
    <ReplyItem v-for="reply in replies" :key="reply.id" :reply="reply" class="mb-2"></ReplyItem>
  </div>
</template>

<style scoped lang="scss"></style>
