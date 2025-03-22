<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, useTemplateRef } from 'vue'
import { parseRouteParamToInt, parseRouteQuery } from '@/utils/parse.ts'
import { emptyInk, type Ink, InkStatus, inkStatusFromProp } from '@/types/ink.ts'
import { detail, draftDetail, privateDetail, rejectedDetail } from '@/service/ink.ts'
import MilkdownWrapper from '@/components/editor/milkdown/MilkdownWrapper.vue'
import { notification } from '@/utils/notification.ts'
import UserCard from '@/components/UserCard.vue'
import { demoInks } from '@/mock/demo_data.ts'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import RecommendCard from '@/components/ink/RecommendCard.vue'

const milkdownRef = useTemplateRef<InstanceType<typeof MilkdownWrapper>>('milkdownRef')
const ink = ref<Ink>(emptyInk())
const route = useRoute()
const loadInk = async (id: number, status: InkStatus) => {
  switch (status) {
    case InkStatus.Published:
      ink.value = await detail(id)
      break
    case InkStatus.UnPublished:
      ink.value = await draftDetail(id)
      break
    case InkStatus.Private:
      ink.value = await privateDetail(id)
      break
    case InkStatus.Pending:
      ink.value = await draftDetail(id)
      break
    case InkStatus.Rejected:
      ink.value = await rejectedDetail(id)
      break
    default:
      notification({
        title: 'Error',
        message: 'Ink status not supported',
        type: 'error',
      })
      return
  }
  console.log(ink.value)
  milkdownRef.value?.setContent(ink.value.contentMeta)
}
onMounted(async () => {
  const inkId = parseRouteParamToInt(route.params.id)
  const statusStr = parseRouteQuery(route.query.status)
  let inkStatus = InkStatus.Published
  if (statusStr != '') {
    inkStatus = inkStatusFromProp(statusStr)
  }
  await loadInk(inkId, inkStatus)
})

const recommendInks = demoInks(5)

const handleLike = () => {
  console.log('like')
}

const handleCollect = () => {
  console.log('collect')
}
</script>

<template>
  <div class="max-screen-w flex items-start">
    <div class="flex-1">
      <el-image fit="cover" class="w-full h-60 rounded-xl" :src="ink.cover" alt="" />
      <MilkdownWrapper :padding="false" :read-only="true" ref="milkdownRef"> </MilkdownWrapper>
      <!--      <div class="milkdown" v-html="ink.contentHtml"></div>-->
      <div class="mt-10 flex">
        <div class="mr-8 flex items-center cursor-pointer hover:text-red-400" @click="handleLike">
          <span class="material-symbols-outlined mr-1"> favorite </span>
          <span class="text-lg">{{ ink?.interactive?.likeCnt ?? 0 }}</span>
        </div>
        <div
          class="mr-8 flex items-center cursor-pointer hover:text-[var(--primary-color)]"
          @click="handleCollect"
        >
          <span class="material-symbols-outlined mr-1"> bookmark </span>
          <span class="text-lg">{{ ink?.interactive?.collectCnt ?? 0 }}</span>
        </div>
        <div class="flex items-center cursor-pointer hover:text-[var(--primary-color)]">
          <span class="material-symbols-outlined mr-1"> bar_chart_4_bars </span>
          <span class="text-lg">{{ ink?.interactive?.viewCnt ?? 0 }}</span>
        </div>
      </div>
    </div>
    <div class="w-90 flex-col sticky-top line-padding ml-10">
      <div>
        <UserCard :user="ink.author" :auto-padding="false"></UserCard>
        <div class="mt-10">为你推荐</div>
        <div>
          <RecommendCard
            class="my-6"
            v-for="ink in recommendInks"
            :ink="ink"
            :key="ink.id"
          ></RecommendCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
