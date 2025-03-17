<script setup lang="ts">
import { defineProps, ref, watchEffect, onMounted } from 'vue'
import type { User } from '@/types/user.ts'
import UserAvatar from '@/components/UserAvatar.vue'
import { useThemeStore } from '@/stores/theme.ts'
import { useRouter } from 'vue-router'
import { logout } from '@/service/user.ts'
import { notification } from '@/utils/notification.ts'
import { useUserStore } from '@/stores/user.ts'
const themeStore = useThemeStore()
const router = useRouter()
const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
  close: {
    type: Function,
    default: () => {},
  },
})

const nightMode = ref(false)
onMounted(() => {
  nightMode.value = themeStore.theme === 'dark'
  watchEffect(() => {
    if (nightMode.value) {
      themeStore.toDark()
    } else {
      themeStore.toLight()
    }
  })
})

const defaultBanner = 'https://lzacg.org/wp-content/uploads/2021/07/pid-67767892log3_p2-scaled.webp'
const opItemClass = 'hover:bg-gray-100 cursor-pointer rounded-sm mt-3 p-2 px-4 flex items-center'

const handleLogout = async () => {
  await logout()
  notification({
    title: 'Success',
    message: '退出登录成功',
    type: 'success',
  })
  const userStore = useUserStore()
  userStore.logout()
}

const handleUserCenter = () => {
  // 关闭popover
  props.close()
  router.push(`/user/${props.user.account}`)
}
</script>

<template>
  <div>
    <div>
      <el-image :src="user.banner ?? defaultBanner" class="w-60 h-20" fit="cover"></el-image>
      <UserAvatar
        @click="router.push(`/user/${user.account}`)"
        :size="60"
        :border="true"
        class="absolute z-1 left-3 top-13"
      ></UserAvatar>
      <div class="mt-8">
        <div class="px-4">
          <div class="text-lg text-gray-600 font-semibold">{{ user.username }}</div>
          <div class="text-sm text-gray-400">@{{ user.account }}</div>
          <div class="mt-2">
            <el-link class="text-sm text-gray-400">{{ user.followers }}关注者</el-link>
            <el-link class="text-sm text-gray-400 ml-4">{{ user.following }}正在关注</el-link>
          </div>
        </div>
        <div class="text-base mt-4 mb-4">
          <div :class="opItemClass" @click="handleUserCenter">
            <span class="material-symbols-outlined">person</span>
            <span class="ml-2">个人中心</span>
          </div>

          <div :class="opItemClass">
            <span class="material-symbols-outlined">schedule</span>
            <span class="ml-2">浏览记录</span>
          </div>
          <div :class="opItemClass">
            <div class="flex justify-between w-full">
              <div class="flex items-center">
                <span class="material-symbols-outlined">dark_mode</span>
                <span class="ml-2">夜间模式</span>
              </div>
              <el-switch v-model="nightMode" />
            </div>
          </div>
          <div :class="opItemClass">
            <span class="material-symbols-outlined">cached</span>
            <span class="ml-2">切换账户</span>
          </div>
          <div :class="opItemClass" @click="handleLogout">
            <span class="material-symbols-outlined">logout</span>
            <span class="ml-2">退出登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
