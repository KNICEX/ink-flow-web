<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import ReplyList from '@/components/notification/ReplyList.vue'
</script>

<template>
  <DashboardContent title="Reply" class="overflow-hidden">
    <ReplyList class="overflow-y-auto"> </ReplyList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
