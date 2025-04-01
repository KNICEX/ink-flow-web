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
    </div>
    <div v-show="loading" class="py-4 text-center text-gray-500">
      <el-icon class="is-loading mr-2"><Loading /></el-icon>
      加载中...
    </div>
    <el-backtop :style="{ height: '4rem', width: '4rem' }" :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import TwitterStyleInk from '@/components/list/ink/TwitterStyleInk.vue'
import { ref } from 'vue'
import type { Ink } from '@/types/ink.ts'
import { demoInks } from '@/mock/demo_data.ts'

defineProps({
  inks: {
    type: Array as () => Ink[],
    default: () => demoInks(),
  },
  maxWidth: {
    type: String,
    default: '800px',
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
  setTimeout(() => {
    loading.value = false
  }, 2000)
  noMore.value = true
}

const emit = defineEmits(['on-item-click'])
const handleItemClick = (id: number) => {
  console.log('item click', id)
  emit('on-item-click', id)
}
</script>

<style scoped lang="scss"></style>
