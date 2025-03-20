<template>
  <div>
    <div :class="wrapClass" v-infinite-scroll="loadMore" :infinite-scroll-disabled="noMore">
      <div v-for="ink in inks" :key="ink.id">
        <InkItem @on-cover-click="handleItemClick" :ink="ink"></InkItem>
      </div>
    </div>
    <p v-show="loading">Loading</p>
    <el-backtop :style="{ height: '4rem', width: '4rem' }" :right="100" :bottom="100" />
  </div>
</template>
<script setup lang="ts">
import clsx from 'clsx'
import InkItem from '@/components/list/ink/ImageInk.vue'
import { computed, ref } from 'vue'
import type { Ink } from '@/types/ink.ts'
import { demoInks } from '@/mock/demo_data.ts'

const props = defineProps({
  maxCols: {
    type: Number,
    default: 3,
  },
  inks: {
    type: Array as () => Ink[],
    default: () => demoInks(),
  },
})
const wrapClass = computed(() => {
  return clsx({
    'grid gap-3 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 ': true,
    'xl:grid-cols-4': props.maxCols == 4,
    '2xl:grid-cols-6': props.maxCols == 6,
  })
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
