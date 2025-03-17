<script setup lang="ts">
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import { listDraft } from '@/service/ink.ts'
import { onMounted, ref } from 'vue'
import InkList from '@/components/list/InkList.vue'
import type { Ink } from '@/types/ink.ts'
import { useRouter } from 'vue-router'
const draftInks = ref<Ink[]>([])
const router = useRouter()
onMounted(async () => {
  draftInks.value = await listDraft({
    offset: 0,
    limit: 15,
  })
})

const handleDraftClick = (id: number) => {
  console.log('draft click', id)
  router.push({
    name: 'edit-ink',
    params: {
      id: id,
    },
  })
}
</script>

<template>
  <DashboardContent title="Draft">
    <InkList @on-item-click="handleDraftClick" :inks="draftInks" :max-cols="6"> </InkList>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
