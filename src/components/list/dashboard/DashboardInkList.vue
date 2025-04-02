<script setup lang="ts">
import { defineProps } from 'vue'
import type { Ink } from '@/types/ink.ts'
import DashboardInkItem from '@/components/list/dashboard/DashboardInkItem.vue'
import NoData from '@/components/empty/NoData.vue'
defineProps({
  inks: {
    type: Array as () => Ink[],
    default: () => [],
  },
  loadMore: {
    type: Function,
    default: () => {},
  },
})
</script>

<template>
  <div v-infinite-scroll="loadMore">
    <DashboardInkItem
      class="p-4 rounded-xl hover:bg-gray-100 transition-colors"
      v-for="ink in inks"
      :ink="ink"
      :key="ink.id"
    ></DashboardInkItem>
    <NoData v-if="inks.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
