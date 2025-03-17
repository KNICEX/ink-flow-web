<script setup lang="ts">
import { type Component, ref } from 'vue'
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import InkCard from '@/components/card/InkCard.vue'

interface cardItemInfo {
  title: string
  icon: Component | string
  count: number
}

const cardItemsInfo = ref([
  {
    title: '文章',
    icon: 'article',
    count: 100,
  },
  {
    title: '评论',
    icon: 'comment',
    count: 100,
  },
  {
    title: '点赞',
    icon: 'like',
    count: 100,
  },
  {
    title: '关注者',
    icon: 'follower',
    count: 100,
  },
  {
    title: '收藏',
    icon: 'collection',
    count: 100,
  },
  {
    title: '正在关注',
    icon: 'following',
    count: 100,
  },
  {
    title: '浏览量',
    icon: 'view',
    count: 100,
  },
])
</script>

<template>
  <DashboardContent title="Dashboard">
    <div class="flex">
      <div class="flex-1 max-w-240 grid grid-cols-3 gap-6">
        <InkCard
          class="flex items-center"
          bg="gray"
          :border="false"
          v-for="item in cardItemsInfo"
          :key="item.title"
        >
          <div class="h-20 p-2">
            <div>
              <span>{{ item.title }}</span>
            </div>
            <div class="mt-2 text-xl font-semibold">{{ item.count }}</div>
          </div>
        </InkCard>
        <InkCard class="flex items-center" bg="gray" :border="false">
          <div class="h-20 p-2">
            <div>
              <span>已加入</span>
            </div>
            <div class="mt-2 text-xl font-semibold">100天</div>
          </div>
        </InkCard>
      </div>
      <div class="w-150 hidden 2xl:block"></div>
    </div>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
