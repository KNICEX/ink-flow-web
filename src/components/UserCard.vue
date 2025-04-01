<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import FollowButton from '@/components/FollowButton.vue'
import { Plus } from '@element-plus/icons-vue'
import type { User } from '@/types/user.ts'
import { computed } from 'vue'
import clsx from 'clsx'
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()
const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
  autoPadding: {
    type: Boolean,
    default: true,
  },
  showFollow: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['followed', 'cancelFollowed'])
const wrapClass = computed(() => {
  return clsx({
    'w-80': true,
    'p-3': props.autoPadding,
  })
})
const joinDays = computed(() => {
  const diff = new Date().getTime() - props.user?.createdAt?.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
})
const isSelf = computed(() => {
  return userStore.getActiveUser()?.user.id == props.user.id
})
const handleFollowed = (id: number) => {
  emit('followed', id)
}
const handleCancelFollowed = (id: number) => {
  emit('cancelFollowed', id)
}
</script>
<template>
  <div :class="wrapClass">
    <div class="flex items-center justify-between">
      <UserAvatar :size="60" :src="user.avatar"></UserAvatar>
      <FollowButton
        v-show="!isSelf"
        :uid="1"
        size="large"
        :followed="user.followed"
        @followed="handleFollowed"
        @cancel-followed="handleCancelFollowed"
      >
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
    <div v-if="showFollow" class="flex items-center mt-4">
      <el-link>{{ user.followers }}关注者</el-link>
      <el-link class="ml-7">{{ user.following }}正在关注</el-link>
    </div>
    <div class="flex mt-4">
      <span class="text-base text-gray-600 dark:text-gray-300">{{ joinDays }}天前加入</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
