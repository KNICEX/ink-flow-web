<script setup lang="ts">
import { ref } from 'vue'
import type { Ink } from '@/types/ink.ts'
import InkList from '@/components/list/ink/InkList.vue'
import NoData from '@/components/empty/NoData.vue'

const inks = ref<Ink[]>([])
</script>

<template>
  <div>
    <InkList :inks="inks"></InkList>
    <NoData v-if="inks.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
