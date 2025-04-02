<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { MergedLike } from '@/types/notification.ts'
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import LikeList from '@/components/notification/LikeList.vue'
import { mergedLikeNotification } from '@/service/notification.ts'

const likes = ref<MergedLike<any>[]>([])

let offset = 0
const limit = 15
let loading = false
onMounted(async () => {
  loading = true
  likes.value = await mergedLikeNotification({
    offset,
    limit,
  })
  offset = likes.value.length
  loading = false
})

const loadMore = async () => {
  if (loading) {
    return
  }
  loading = true
  const res = await mergedLikeNotification({
    offset,
    limit,
  })
  if (res.length == 0) {
    loading = false
    return
  }
  likes.value = [...likes.value, ...res]
  offset += res.length
  loading = false
}
</script>
<template>
  <DashboardContent title="Like" class="overflow-hidden">
    <LikeList class="overflow-y-auto" :merged-likes="likes" :load-more="loadMore"></LikeList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
