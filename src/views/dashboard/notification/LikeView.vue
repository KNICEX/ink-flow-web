<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import LikeList from '@/components/notification/LikeList.vue'
</script>
<template>
  <DashboardContent title="Like" class="overflow-hidden">
    <LikeList class="overflow-y-auto"></LikeList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
