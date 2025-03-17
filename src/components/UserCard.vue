<template>
  <div class="w-80 p-3">
    <div class="flex items-center justify-between">
      <UserAvatar :size="60" :src="user.avatar"></UserAvatar>
      <FollowButton :uid="1" size="large" :followed="user.followed">
        <template #before>
          <el-icon class="mr-1">
            <Plus></Plus>
          </el-icon>
        </template>
      </FollowButton>
    </div>
    <div class="flex flex-col justify-center mt-3">
      <span class="text-base">{{ user.username }}</span>
      <span>
        <el-link class="text-gray-500 text-sm">@{{ user.account }}</el-link>
      </span>
    </div>
    <div class="mt-3">
      <span class="text-base">{{ user.aboutMe }}</span>
    </div>
    <div class="flex items-center mt-4">
      <el-link>{{ user.followers }}关注者</el-link>
      <el-link class="ml-7">{{ user.following }}正在关注</el-link>
    </div>
    <div class="flex mt-4">
      <span class="text-base text-gray-600 dark:text-gray-300">30天前加入</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import FollowButton from '@/components/FollowButton.vue'
import { Plus } from '@element-plus/icons-vue'
import type { User } from '@/types/user.ts'

defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})
</script>
<style scoped lang="scss"></style>
