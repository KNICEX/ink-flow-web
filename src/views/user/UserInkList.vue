<script setup lang="ts">
import InkList from '@/components/list/ink/InkList.vue'
import type { Ink } from '@/types/ink.ts'
import { list } from '@/service/ink.ts'
import { ref, watch } from 'vue'
import NoData from '@/components/empty/NoData.vue'
const props = defineProps({
  uid: {
    type: Number,
    default: 0,
  },
})

let offset = 0
const limit = 15
const inks = ref<Ink[]>([])
watch(
  () => props.uid,
  async () => {
    if (props.uid != 0) {
      inks.value = await list({
        authorId: props.uid,
        offset: offset,
        limit: limit,
      })
      offset = inks.value.length
    }
  },
  { immediate: true },
)

const loadMore = () => {
  list({
    authorId: props.uid,
    offset: offset,
    limit: limit,
  }).then((res) => {
    if (res.length == 0) {
      return
    }
    inks.value = [...inks.value, ...res]
    offset += res.length
  })
}
</script>

<template>
  <div>
    <InkList :max-cols="4" :inks="inks" :load-more="loadMore"></InkList>
    <NoData v-if="inks.length == 0"></NoData>
  </div>
</template>

<style scoped lang="scss"></style>
