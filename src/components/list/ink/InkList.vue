<script setup lang="ts">
import clsx from 'clsx'
import InkItem from '@/components/list/ink/ImageInk.vue'
import { computed } from 'vue'
import type { Ink } from '@/types/ink.ts'
import { demoInks } from '@/mock/demo_data.ts'
import NoData from '@/components/empty/NoData.vue'

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
    'grid gap-3 sm:gap-6 sm:grid-cols-2  md:grid-cols-3': true,
    'xl:grid-cols-4 ': props.maxCols == 4,
    'xl:grid-cols-5 lg:grid-cols-4': props.maxCols == 5,
    '2xl:grid-cols-6': props.maxCols == 6,
  })
})

const emit = defineEmits(['on-item-click'])
const handleItemClick = (id: number) => {
  console.log('item click', id)
  emit('on-item-click', id)
}
</script>
<template>
  <div>
    <div :class="wrapClass">
      <div v-for="ink in inks" :key="ink.id">
        <InkItem @on-cover-click="handleItemClick" :ink="ink"></InkItem>
      </div>
    </div>
    <NoData v-if="inks.length == 0"></NoData>
    <el-backtop :style="{ height: '4rem', width: '4rem' }" :right="100" :bottom="100" />
  </div>
</template>
<style scoped lang="scss"></style>
