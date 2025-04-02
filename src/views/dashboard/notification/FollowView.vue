<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import FollowList from '@/components/notification/FollowList.vue'
import type { Notification } from '@/types/notification.ts'
import { onMounted, ref } from 'vue'
import { followNotification } from '@/service/notification.ts'
import { wrapMaxIdPagedFunc } from '@/utils/pagedLoadWrap.ts'

const follows = ref<Notification<never, never>[]>([])
// let maxId = 0
const limit = 15
// let loading = false
const { loadMore } = wrapMaxIdPagedFunc(async (maxId: number) => {
  const res = await followNotification({
    maxId,
    limit,
  })
  if (res.length == 0) {
    return 0
  }
  follows.value = [...follows.value, ...res]
  return follows.value[follows.value.length - 1].id
})
onMounted(() => {
  loadMore()
})

// const loadMore = async () => {
//   if (loading) {
//     return
//   }
//   loading = true
//   const res = await followNotification({
//     maxId,
//     limit,
//   })
//   if (res.length == 0) {
//     loading = false
//     return
//   }
//   follows.value = [...follows.value, ...res]
//   maxId = res[res.length - 1]?.id ?? 0
//   loading = false
// }
</script>

<template>
  <DashboardContent title="Follow" class="overflow-hidden">
    <FollowList class="overflow-y-auto" :follows="follows" :load-more="loadMore"></FollowList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
