<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import ReplyList from '@/components/notification/ReplyList.vue'
import type { Notification, ReplyContent } from '@/types/notification.ts'
import { replyNotification } from '@/service/notification.ts'

const replies = ref<Notification<any, ReplyContent>[]>([])
let maxId = 0
const limit = 15
let loading = false
onMounted(async () => {
  loading = true
  replies.value = await replyNotification({
    maxId,
    limit,
  })

  maxId = replies.value[replies.value.length - 1]?.id ?? 0
  loading = false
})

const loadMore = async () => {
  if (loading) {
    return
  }
  console.log('load more')
  loading = true
  const res = await replyNotification({
    maxId,
    limit,
  })
  if (res.length == 0) {
    loading = false
    return
  }
  replies.value = [...replies.value, ...res]
  maxId = res[res.length - 1]?.id ?? 0
  loading = false
}
</script>

<template>
  <DashboardContent title="Reply" class="overflow-hidden">
    <ReplyList class="overflow-y-auto" :replies="replies" :load-more="loadMore"> </ReplyList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
