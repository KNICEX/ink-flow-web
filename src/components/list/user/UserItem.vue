<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import type { User } from '@/types/user.ts'
import FollowButton from '@/components/FollowButton.vue'
defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})
</script>

<template>
  <div class="flex justify-between">
    <div class="flex">
      <UserAvatar :src="user.avatar" :size="80"></UserAvatar>
      <div class="ml-6">
        <div class="text-lg">{{ user.username }}</div>
        <div class="nav-text">@{{ user.account }}</div>
        <div>{{ user.aboutMe }}</div>
      </div>
    </div>
    <div>
      <FollowButton size="large" :uid="user.id" :followed="user.followed"></FollowButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
