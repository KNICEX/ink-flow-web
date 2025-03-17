<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import FollowButton from '@/components/FollowButton.vue'
import UserCard from '@/components/UserCard.vue'
import InkPopover from '@/components/popover/InkPopover.vue'
import type { User } from '@/types/user.ts'
defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})
</script>

<template>
  <div
    class="flex items-center justify-between py-2 my-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-4xl"
  >
    <div class="flex">
      <InkPopover>
        <template #content>
          <UserCard :user="user"></UserCard>
        </template>
        <template #reference>
          <div class="flex">
            <UserAvatar :src="user.avatar" class="cursor-pointer" :size="48"></UserAvatar>
          </div>
        </template>
      </InkPopover>
      <div class="ml-2 flex flex-col justify-center">
        <div type="info" class="text-sm hover:underline cursor-pointer">{{ user.username }}</div>
        <div class="text-sm text-gray-500">@{{ user.account }}</div>
      </div>
    </div>
    <FollowButton :uid="1"></FollowButton>
  </div>
</template>

<style scoped lang="scss"></style>
