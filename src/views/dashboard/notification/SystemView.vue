<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import SystemList from '@/components/notification/SystemList.vue'
import { demoNotifications } from '@/mock/demo_data.ts'
import { NotificationType } from '@/types/notification.ts'

const nos = demoNotifications(NotificationType.System)
</script>

<template>
  <DashboardContent title="Notification" class="overflow-hidden">
    <SystemList class="overflow-y-auto" :notifications="nos"></SystemList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
