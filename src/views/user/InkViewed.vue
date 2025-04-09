<script setup lang="ts">
import { ref } from 'vue'
import InkList from '@/components/list/ink/InkList.vue'
import type { Ink } from '@/types/ink.ts'
import { onBeforeMount } from 'vue'
import { listViewed } from '@/service/ink.ts'
import NoData from '@/components/empty/NoData.vue'
const inks = ref<Ink[]>([])

onBeforeMount(async () => {
  inks.value = await listViewed({
    maxId: 0,
    limit: 25,
  })
})
</script>

<template>
  <div>
    <InkList :inks="inks" :max-cols="4"></InkList>
  </div>
</template>

<style scoped lang="scss"></style>
