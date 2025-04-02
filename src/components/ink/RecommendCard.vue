<script setup lang="ts">
import type { Ink } from '@/types/ink.ts'
import InkCover from '@/components/image/InkCover.vue'

defineProps({
  ink: {
    type: Object as () => Ink,
    required: true,
  },
})
</script>

<template>
  <div class="w-full h-full flex rounded-xl overflow-hidden">
    <ink-cover
      class="w-36 h-24 rounded-xl border border-gray-200 hover:scale-105 transition-all dark:border-gray-700 cursor-pointer"
      :src="ink.cover"
      :backoff="ink.title"
    >
    </ink-cover>
    <div class="ml-4 flex-1">
      <div class="line-clamp-2 cursor-pointer">{{ ink.title }}</div>
      <div class="hover:underline cursor-pointer mt-2">@{{ ink.author.account }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
