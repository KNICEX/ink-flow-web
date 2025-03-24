<script setup lang="ts">
import InkCover from '@/components/image/InkCover.vue'
import { defaultBanner } from '@/consts/default.ts'
import NotificationItem from '@/components/notification/NotificationItem.vue'
import { demoUsers } from '@/mock/demo_data.ts'

const subjectType = Math.random() > 0.5 ? 'comment' : 'ink'
</script>

<template>
  <NotificationItem :users="demoUsers(1)">
    <template #title> 回复了你的评论/文章 </template>
    <div class="line-clamp-3 my-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci autem consequuntur
      corporis cum deserunt dolores
    </div>
    <div
      v-if="subjectType == 'comment'"
      class="text-base text-gray-500 border-gray-300 pl-2 border-l-3 line-clamp-1"
    >
      lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci autem consequuntur
    </div>
    <div v-else class="flex border-gray-300 pl-2 border-l-3">
      <InkCover class="w-40 h-30 rounded-xl" :src="defaultBanner"></InkCover>
      <div class="ml-4 flex flex-col justify-between">
        <div>Title</div>
        <div>
          <el-tag type="info">web3</el-tag>
        </div>
        <div class="nav-text">2024年11月1日 22:22</div>
      </div>
    </div>
  </NotificationItem>
</template>

<style scoped lang="scss"></style>
