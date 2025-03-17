<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MilkdownWrapper from '@/components/editor/milkdown/MilkdownWrapper.vue'
const milkdownRef = useTemplateRef<InstanceType<typeof MilkdownWrapper>>('milkdownRef')
</script>

<template>
  <div>
    <MilkdownWrapper :read-only="true" ref="milkdownRef"> </MilkdownWrapper>
  </div>
</template>

<style scoped lang="scss"></style>
