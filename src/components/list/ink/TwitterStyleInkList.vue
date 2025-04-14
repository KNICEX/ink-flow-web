<script setup lang="ts">
import TwitterStyleInk from '@/components/list/ink/TwitterStyleInk.vue'
import type { Ink } from '@/types/ink.ts'
import BackTop from '@/components/BackTop.vue'
import NoData from '@/components/empty/NoData.vue'
import InkLoading from '@/components/loading/InkLoading.vue'
import { useActive } from '@/hook/active.ts'

defineProps({
  inks: {
    type: Array as () => Ink[],
    default: () => [],
  },
  previewLength: {
    type: Number,
    default: 150,
  },
  loadMore: {
    type: Function,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const active = useActive()
</script>

<template>
  <div>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="!active">
      <div v-for="ink in inks" :key="ink.id" class="mb-4">
        <TwitterStyleInk :ink="ink" :previewLength="previewLength"></TwitterStyleInk>
      </div>
      <NoData v-show="!loading && inks.length == 0"></NoData>
      <InkLoading v-show="loading" :loading="loading"></InkLoading>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<style scoped lang="scss"></style>
