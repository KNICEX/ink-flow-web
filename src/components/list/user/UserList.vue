<script setup lang="ts">
import UserItem from '@/components/list/user/UserItem.vue'
import { demoUsers } from '@/mock/demo_data.ts'
import type { User } from '@/types/user.ts'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  users: {
    type: Array as () => User[],
    default: () => demoUsers(),
  },
})
</script>

<template>
  <div class="grid gap-x-20 gap-y-10 md:grid-cols-2">
    <UserItem v-for="user in users" :user="user" :key="user.id"></UserItem>
  </div>
  <NoData v-if="users.length == 0"></NoData>
</template>

<style scoped lang="scss"></style>
