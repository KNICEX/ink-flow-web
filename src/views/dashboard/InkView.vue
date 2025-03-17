<script setup lang="ts">
import { onMounted, provide, reactive, ref, watch } from 'vue'
import DashboardContent from '@/views/dashboard/DashboardContent.vue'
import DashboardInkList from '@/components/list/dashboard/DashboardInkList.vue'
import { type Ink, InkStatus } from '@/types/ink.ts'
import {
  listDraft,
  listRejected,
  listPending,
  listPrivate,
  list,
  deleteLive,
  deleteDraft,
  deletePrivate,
} from '@/service/ink.ts'
import { demoInks } from '@/mock/demo_data.ts'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { notification } from '@/utils/notification.ts'
import { confirm } from '@/utils/message.ts'
const title = ref('Ink')
const activeType = ref('published')
const inks = ref<Ink[]>([])
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
onMounted(async () => {
  inks.value = demoInks()
})

watch(
  () => route.query,
  async () => {
    const type = route.params.status
    console.log('ink view status: ', type)
    switch (type) {
      case 'published':
        activeType.value = 'published'
        inks.value = await list({
          authorId: userStore.getActiveUser()?.user.id ?? 0,
          offset: 0,
          limit: 15,
        })
        break
      case 'pending':
        activeType.value = 'pending'
        inks.value = await listPending({
          offset: 0,
          limit: 15,
        })
        break
      case 'rejected':
        activeType.value = 'rejected'
        inks.value = await listRejected({
          offset: 0,
          limit: 15,
        })
        break
      case 'draft':
        activeType.value = 'draft'
        inks.value = await listDraft({
          offset: 0,
          limit: 15,
        })
        break
      case 'private':
        activeType.value = 'private'
        inks.value = await listPrivate({
          offset: 0,
          limit: 15,
        })
        break
      default:
        activeType.value = 'published'
        break
    }
  },
  { immediate: true },
)

const handleTabChange = (tab: string) => {
  router.push({
    name: 'ink',
    params: {
      status: tab,
    },
  })
}

const handleNewInk = () => {
  router.push({
    name: 'editor',
  })
}

const confirmBox = (onConfirm: () => void) => {
  confirm({
    title: 'Warning',
    message: '删除后无法恢复，确认删除吗？',
    confirmed: onConfirm,
  })
}
const delSuccess = () => {
  notification({
    type: 'success',
    title: 'Success',
    message: '内容删除成功',
  })
}
const refreshList = () => {}

const handleInkOp = async (ink: Ink, op: 'delete' | 'preview' | 'edit') => {
  switch (op) {
    case 'delete':
      switch (ink.status) {
        case InkStatus.Published:
          confirmBox(async () => {
            await deleteLive(ink.id)
            delSuccess()
          })
          break
        case InkStatus.UnPublished:
          confirmBox(async () => {
            await deleteDraft(ink.id)
            delSuccess()
          })
          break
        case InkStatus.Private:
          await deletePrivate(ink.id)
          break
      }
      break
    case 'preview':
      console.log('preview ink', ink.id)
      break
    case 'edit':
      await router.push({
        name: 'editor',
        params: {
          id: ink.id,
        },
      })
      break
  }
}

provide('handle-ink-op', handleInkOp)
</script>

<template>
  <DashboardContent :title="title">
    <div class="flex overflow-hidden flex-1 flex-col">
      <div>
        <el-button class="w-30" size="large" round type="primary" @click="handleNewInk"
          >新建文章</el-button
        >
      </div>
      <div class="pt-4 text-lg">
        <el-tabs v-model="activeType" @tab-change="handleTabChange">
          <el-tab-pane label="已发布" name="published"> </el-tab-pane>
          <el-tab-pane label="审核中" name="pending"> </el-tab-pane>
          <el-tab-pane label="审核失败" name="rejected"> </el-tab-pane>
          <el-tab-pane label="草稿" name="draft"> </el-tab-pane>
          <el-tab-pane label="私有" name="private"> </el-tab-pane>
        </el-tabs>
      </div>
      <DashboardInkList :inks="inks" class="flex-1 overflow-y-auto"> </DashboardInkList>
    </div>
  </DashboardContent>
</template>

<style scoped lang="scss"></style>
