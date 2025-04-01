<script setup lang="ts">
import NotificationItem from '@/components/notification/NotificationItem.vue'
import { demoUsers } from '@/mock/demo_data.ts'
import type { Ink } from '@/types/ink.ts'
import type { ReplyContent, Notification } from '@/types/notification.ts'
import { computed } from 'vue'
import InkReference from '@/components/ink/InkReference.vue'
const props = defineProps({
  reply: {
    type: Object as () => Notification<Ink, ReplyContent>,
    required: true,
  },
})
const replyTo = computed(() => {
  if (props.reply.content.target?.content) {
    return '评论'
  }
  return '文章'
})
</script>

<template>
  <NotificationItem :users="demoUsers(1)">
    <template #title> 回复了你的{{ replyTo }} </template>
    <div class="line-clamp-3 my-2">
      {{ reply.content.source.content }}
    </div>
    <div
      v-if="reply.content?.target && reply.content?.target?.content != ''"
      class="text-base text-gray-500 border-gray-300 pl-2 border-l-3 line-clamp-1"
    >
      {{ reply.content?.target?.content }}
    </div>
    <div v-else class="flex border-gray-300 pl-2 border-l-3">
      <InkReference :ink="reply.subject!"></InkReference>
    </div>
  </NotificationItem>
</template>

<style scoped lang="scss"></style>
