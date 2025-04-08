<template>
  <div>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="noMore">
      <div v-for="ink in inks" :key="ink.id" class="mb-4">
        <TwitterStyleInk
          @on-cover-click="handleItemClick"
          :ink="ink"
          :previewLength="previewLength"
        ></TwitterStyleInk>
      </div>
      <NoData v-if="inks.length == 0 && !loading"></NoData>
    </div>
    <div v-show="loading" class="py-4 text-center text-gray-500">加载中...</div>
    <BackTop></BackTop>
  </div>
</template>

<script setup lang="ts">
import TwitterStyleInk from '@/components/list/ink/TwitterStyleInk.vue'
import { ref } from 'vue'
import type { Ink } from '@/types/ink.ts'
import BackTop from '@/components/BackTop.vue'
import NoData from '@/components/empty/NoData.vue'

defineProps({
  inks: {
    type: Array as () => Ink[],
    default: () => [],
  },
  previewLength: {
    type: Number,
    default: 150,
  },
})

const noMore = ref(false)
const loading = ref(false)
const loadMore = () => {
  loading.value = true
  emit('loadMore')
  setTimeout(() => {
    loading.value = false
  }, 2000)
  noMore.value = true
}

const emit = defineEmits(['on-item-click', 'loadMore'])
const handleItemClick = (id: number) => {
  console.log('item click', id)
  emit('on-item-click', id)
}
</script>

<style scoped lang="scss"></style>
