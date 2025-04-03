<script setup lang="ts">
import InkList from '@/components/list/ink/InkList.vue'
import type { Ink } from '@/types/ink.ts'
import { list } from '@/service/ink.ts'
import { ref, watch } from 'vue'
import NoData from '@/components/empty/NoData.vue'
import { wrapOffsetPagedFunc } from '@/utils/pagedLoadWrap.ts'
const props = defineProps({
  uid: {
    type: Number,
    default: 0,
  },
})

const limit = 15
const inks = ref<Ink[]>([])

const { loadMore } = wrapOffsetPagedFunc(async (offset: number) => {
  if (props.uid == 0) {
    return
  }
  const res = await list({
    authorId: props.uid,
    offset: offset,
    limit: limit,
  })
  inks.value = [...inks.value, ...res]
  return res.length
}, limit)

watch(
  () => props.uid,
  () => {
    loadMore()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <InkList :max-cols="4" :inks="inks" :load-more="loadMore"></InkList>
    <NoData v-if="inks.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
