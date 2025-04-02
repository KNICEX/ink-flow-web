<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import FollowList from '@/components/notification/FollowList.vue'
import type { Notification } from '@/types/notification.ts'
import { onMounted, ref } from 'vue'
import { followNotification } from '@/service/notification.ts'

const follows = ref<Notification<never, never>[]>([])
let maxId = 0
const limit = 15
let loading = false
onMounted(async () => {
  loading = true
  follows.value = await followNotification({
    maxId,
    limit,
  })
  maxId = follows.value[follows.value.length - 1]?.id ?? 0
  loading = false
})

const loadMore = async () => {
  if (loading) {
    return
  }
  loading = true
  const res = await followNotification({
    maxId,
    limit,
  })
  if (res.length == 0) {
    loading = false
    return
  }
  follows.value = [...follows.value, ...res]
  maxId = res[res.length - 1]?.id ?? 0
  loading = false
}
</script>

<template>
  <DashboardContent title="Follow" class="overflow-hidden">
    <FollowList class="overflow-y-auto"></FollowList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
