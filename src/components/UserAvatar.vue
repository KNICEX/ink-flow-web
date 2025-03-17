<template>
  <el-avatar :size="size" :class="avatarClass" :src="src" />
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
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
})
const avatarClass = computed(() => {
  return props.border ? 'border-solid border-2 cursor-pointer' : 'cursor-pointer'
})
const src = computed(() => {
  return (
    props.src ||
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741537291/twitter_%E8%B0%B7%E5%B7%9D_kibishiihiekomi__20250204-093016_1886708845923459466_photo_dntbvf.jpg'
  )
})
</script>
<style scoped lang="scss"></style>
