<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import SystemList from '@/components/notification/SystemList.vue'
import type { Notification } from '@/types/notification.ts'
import { onMounted, ref } from 'vue'
import { systemNotification } from '@/service/notification.ts'

const nos = ref<Notification<any, string>[]>([])
let maxId = 0
const limit = 15
let loading = false
onMounted(async () => {
  loading = true
  nos.value = await systemNotification({
    maxId,
    limit,
  })
  maxId = nos.value[nos.value.length - 1]?.id ?? 0
  loading = false
})

const loadMore = async () => {
  if (loading) {
    return
  }
  loading = true
  const res = await systemNotification({
    maxId,
    limit,
  })
  if (res.length == 0) {
    loading = false
    return
  }
  nos.value = [...nos.value, ...res]
  maxId = res[res.length - 1]?.id ?? 0
  loading = false
}
</script>

<template>
  <DashboardContent title="Notification" class="overflow-hidden">
    <SystemList class="overflow-y-auto" :notifications="nos" :load-more="loadMore"></SystemList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
