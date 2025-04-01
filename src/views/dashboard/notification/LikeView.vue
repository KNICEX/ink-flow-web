<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import LikeList from '@/components/notification/LikeList.vue'
import { demoMergedLike } from '@/mock/demo_data.ts'

const likes = demoMergedLike()
</script>
<template>
  <DashboardContent title="Like" class="overflow-hidden">
    <LikeList class="overflow-y-auto" :merged-likes="likes"></LikeList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
