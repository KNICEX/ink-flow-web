<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  horizon: {
    type: Boolean,
    default: false,
  },
})

const icon = computed(() => {
  return props.horizon ? 'more_horiz' : 'more_vert'
})
</script>

<template>
  <div
    class="hover:bg-gray-200 cursor-pointer size-10 transition-colors rounded-lg flex justify-center items-center"
  >
    <span class="material-symbols-outlined text-gray-600"> {{ icon }} </span>
  </div>
</template>

<style scoped lang="scss"></style>
