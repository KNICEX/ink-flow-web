<script setup lang="ts">
import FollowUser from '@/components/list/user/FollowUser.vue'
import type { User } from '@/types/user.ts'
defineProps({
  users: {
    type: Array as () => User[],
    required: true,
  },
})
</script>

<template>
  <div class="w-full">
    <FollowUser v-for="user in users" :key="user.id" :user="user"></FollowUser>
  </div>
</template>

<style scoped lang="scss"></style>
