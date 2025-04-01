<script setup lang="ts">
import { emptyInteractive, type Interactive } from '@/types/ink.ts'

defineProps({
  interactive: {
    type: Object as () => Interactive,
    default: () => emptyInteractive(),
  },
})

const handleLike = () => {}
const handleFavorite = () => {}
</script>

<template>
  <div class="flex text-gray-600">
    <div class="mr-8 flex items-center cursor-pointer hover:text-[var(--primary-color)]">
      <span class="material-symbols-outlined mr-1 small-icon"> chat </span>
      <span class="">{{ interactive.commentCnt ?? 0 }}</span>
    </div>
    <div class="mr-8 flex items-center cursor-pointer hover:text-red-400" @click="handleLike">
      <span class="material-symbols-outlined mr-1 small-icon"> favorite </span>
      <span class="">{{ interactive.likeCnt ?? 0 }}</span>
    </div>
    <div
      class="mr-8 flex items-center cursor-pointer hover:text-[var(--primary-color)]"
      @click="handleFavorite"
    >
      <span class="material-symbols-outlined mr-1 small-icon"> bookmark </span>
      <span class="">{{ interactive.favoriteCnt ?? 0 }}</span>
    </div>
    <div class="flex items-center cursor-pointer hover:text-[var(--primary-color)]">
      <span class="material-symbols-outlined mr-1 small-icon"> bar_chart_4_bars </span>
      <span class="">{{ interactive.viewCnt ?? 0 }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.small-icon {
  font-size: 1.3rem;
}
</style>
