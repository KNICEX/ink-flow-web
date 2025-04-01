<script setup lang="ts">
import { demoNotifications } from '@/mock/demo_data.ts'
import { NotificationType } from '@/types/notification.ts'
import FollowItem from '@/components/notification/FollowItem.vue'

const follows = demoNotifications(NotificationType.Follow)
</script>

<template>
  <div>
    <FollowItem v-for="follow in follows" :notification="follow" :key="follow.id"></FollowItem>
  </div>
</template>

<style scoped lang="scss"></style>
