<script setup lang="ts">
import { defineProps } from 'vue'
import type { Ink } from '@/types/ink.ts'
import DashboardInkItem from '@/components/list/dashboard/DashboardInkItem.vue'
defineProps({
  inks: {
    type: Array as () => Ink[],
    default: () => [],
  },
})
</script>

<template>
  <div>
    <DashboardInkItem
      class="p-4 rounded-xl hover:bg-gray-100 transition-colors"
      v-for="ink in inks"
      :ink="ink"
      :key="ink.id"
    ></DashboardInkItem>
    <div v-if="inks.length == 0" class="h-full flex items-center justify-center">
      <el-empty :image-size="200" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
