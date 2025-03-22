<template>
  <div>
    <el-image
      :class="avatarClass"
      :style="sizeStyle"
      :src="src"
      fit="cover"
      :preview-src-list="previewList"
      hide-on-click-modal
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import clsx from 'clsx'
const props = defineProps({
  size: {
    type: Number,
    default: 50,
  },
  src: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: false,
  },
  preview: {
    type: Boolean,
    default: false,
  },
})
const avatarClass = computed(() => {
  return clsx({
    'border-solid border-2 border-white': props.border,
    'cursor-pointer rounded-full aspect-square': true,
  })
})
const sizeStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
  }
})
const src = computed(() => {
  return (
    props.src ||
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741537291/twitter_%E8%B0%B7%E5%B7%9D_kibishiihiekomi__20250204-093016_1886708845923459466_photo_dntbvf.jpg'
  )
})
const previewList = computed(() => {
  return props.preview ? [src.value] : []
})
</script>
<style scoped lang="scss"></style>
