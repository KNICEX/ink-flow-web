<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="white-bg rounded-lg my-4 mr-4 shadow-xl p-10 flex-1 flex flex-col">
    <slot name="header">
      <h2 class="text-2xl mb-8">{{ title }}</h2>
    </slot>
    <slot class="flex-1"></slot>
  </div>
</template>

<style scoped lang="scss"></style>
