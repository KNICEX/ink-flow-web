<script setup lang="ts">
import type { Ink } from '@/types/ink.ts'
import { defaultAvatar } from '@/consts/default.ts'
import { formatDate } from '@/utils/date.ts'
import InkCover from '@/components/image/InkCover.vue'

defineProps({
  ink: {
    type: Object as () => Ink,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="flex">
    <InkCover class="w-40 h-30 rounded-xl" :src="defaultAvatar"></InkCover>
    <div class="flex flex-col justify-between ml-6">
      <div class="nav-text">
        {{ ink.title }}
      </div>
      <div>
        <el-tag type="info" class="mr-2" v-for="(tag, idx) in ink.tags" :key="idx">{{
          tag
        }}</el-tag>
      </div>
      <div class="text-sm text-gray-500 mt-1">{{ formatDate(ink.createdAt) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
