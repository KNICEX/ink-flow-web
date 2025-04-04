<script setup lang="ts">
import FollowUser from '@/components/list/user/FollowUser.vue'
import type { User } from '@/types/user.ts'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  users: {
    type: Array as () => User[],
    required: true,
  },
  loadMore: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <div class="w-full" v-infinite-scroll="loadMore">
    <FollowUser v-for="user in users" :key="user.id" :user="user"></FollowUser>
    <NoData v-if="users.length == 0" description="还没有关注噢"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
