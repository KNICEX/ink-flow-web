<script setup lang="ts">
import { defaultAvatar } from '@/consts/default.ts'
import NotificationItem from '@/components/notification/NotificationItem.vue'
import { demoUsers } from '@/mock/demo_data.ts'
import InkCover from '@/components/image/InkCover.vue'

const subjectType = Math.random() > 0.5 ? 'reply' : 'ink'
const subjectTitleMap = {
  reply: '回复',
  ink: '作品',
}
const users = demoUsers(Math.ceil(Math.random() * 10))
</script>

<template>
  <NotificationItem :users="users">
    <template #title>
      <span v-if="users.length == 1"> 赞了你的{{ subjectTitleMap[subjectType] }} </span>
      <span v-else>等{{ users.length }}人赞了你的{{ subjectTitleMap[subjectType] }}</span>
    </template>
    <div v-if="subjectType == 'reply'" class="text-gray-600 mt-2 line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cumque cupiditate,
      debitis dignissimos facere natus nesciunt quis veritatis. Assumenda aut expedita facere illo
      libero saepe veniam voluptas! Amet, molestias repellat! ebitis dignissimos facere natus
      nesciunt quis veritatis. Assumenda aut expedita facere illo libero saepe veniam voluptas!
      Amet, molestias repellat!
    </div>
    <div v-else class="mt-2">
      <div class="flex">
        <InkCover class="w-40 h-30 rounded-xl" :src="defaultAvatar"></InkCover>
        <div class="flex flex-col justify-between ml-6">
          <div class="nav-text">作品标题</div>
          <div>
            <el-tag type="info">#标签</el-tag>
          </div>
          <div class="text-sm text-gray-500 mt-1">2025年3月1日 21:33</div>
        </div>
      </div>
    </div>
  </NotificationItem>
</template>

<style scoped lang="scss"></style>
