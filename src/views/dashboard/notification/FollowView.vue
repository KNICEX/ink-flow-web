<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import FollowList from '@/components/notification/FollowList.vue'
</script>

<template>
  <DashboardContent title="Follow" class="overflow-hidden">
    <FollowList class="overflow-y-auto"></FollowList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
