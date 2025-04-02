<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, useTemplateRef } from 'vue'
import { parseRouteParamToInt, parseRouteQuery } from '@/utils/parse.ts'
import { emptyInk, type Ink, InkStatus, inkStatusFromProp } from '@/types/ink.ts'
import {
  cancelFavorite,
  cancelLike,
  detail,
  draftDetail,
  favorite,
  like,
  privateDetail,
  rejectedDetail,
} from '@/service/ink.ts'
import MilkdownWrapper from '@/components/editor/milkdown/MilkdownWrapper.vue'
import { notification } from '@/utils/notification.ts'
import UserCard from '@/components/UserCard.vue'
import { demoInks } from '@/mock/demo_data.ts'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import RecommendCard from '@/components/ink/RecommendCard.vue'
import CommentList from '@/components/list/comment/CommentList.vue'
import InkInteractive from '@/components/ink/InkInteractive.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import InkPopover from '@/components/popover/InkPopover.vue'
import { formatDate } from '@/utils/date.ts'

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

const handleLike = async () => {
  await like(ink.value.id)
  ink.value.interactive.likeCnt = ink.value.interactive.likeCnt + 1
  ink.value.interactive.liked = !ink.value.interactive.liked
}

const handleFavorite = async () => {
  await favorite(ink.value.id, 0)
  ink.value.interactive.favoriteCnt = ink.value.interactive.favoriteCnt + 1
  ink.value.interactive.favorited = !ink.value.interactive.favorited
}

const handleCancelLike = async () => {
  await cancelLike(ink.value.id)
  ink.value.interactive.likeCnt = Math.max(0, ink.value.interactive.likeCnt - 1)
  ink.value.interactive.liked = !ink.value.interactive.liked
}

const handleCancelFavorite = async () => {
  await cancelFavorite(ink.value.id)
  ink.value.interactive.favoriteCnt = Math.max(0, ink.value.interactive.favoriteCnt - 1)
  ink.value.interactive.favorited = !ink.value.interactive.favorited
}
</script>

<template>
  <div class="max-screen-w flex items-start line-padding">
    <div class="flex-1">
      <div class="flex cursor-pointer">
        <InkPopover place="bottom">
          <template #reference>
            <UserAvatar :src="ink.author.avatar"></UserAvatar>
          </template>
          <template #content>
            <UserCard :user="ink.author"></UserCard>
          </template>
        </InkPopover>
        <div class="ml-3">
          <div class="semibold-text">{{ ink.author.username }}</div>
          <div class="nav-text hover:underline">@{{ ink.author.account }}</div>
        </div>
      </div>
      <!--      <MilkdownWrapper :padding="false" :read-only="true" ref="milkdownRef" class="mt-4">-->
      <!--      </MilkdownWrapper>-->
      <div
        class="prose mt-4 prose-slate dark:prose-invert rounded-image"
        v-html="ink.contentHtml"
      ></div>
      <div class="nav-text mt-2">{{ formatDate(ink.createdAt) }}</div>
      <div class="mt-6 flex">
        <InkInteractive
          :interactive="ink.interactive"
          @like="handleLike"
          @cancel-like="handleCancelLike"
          @favorite="handleFavorite"
          @cancel-favorite="handleCancelFavorite"
        ></InkInteractive>
      </div>
      <CommentList class="mt-6"></CommentList>
    </div>
    <div class="w-90 flex-col sticky-top line-padding ml-10">
      <div>
        <!--        <UserCard :user="ink.author" :auto-padding="false"></UserCard>-->
        <div class="mt-6">相关推荐</div>
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
