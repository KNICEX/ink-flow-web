<script setup lang="ts">
import { ref, watch } from 'vue'
import FollowUserList from '@/components/list/user/FollowUserList.vue'
import { wrapMaxIdPagedFunc } from '@/utils/pagedLoadWrap.ts'
import { follower, following } from '@/service/relation.ts'
import { useUserStore } from '@/stores/user.ts'
import type { User } from '@/types/user.ts'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const route = useRoute()

const limit = 15
const users = ref<User[]>([])
let loadFunc: (
  uid: number,
  req: { maxId?: number; limit: number },
) => Promise<User[]> = async () => {
  return []
}
const { loadMore, reset } = wrapMaxIdPagedFunc(async (maxId: number) => {
  const uid = userStore.getActiveUser()?.user.id
  if (!uid) {
    return
  }
  const res = await loadFunc(uid, {
    maxId,
    limit,
  })
  if (res.length == 0) {
    return 0
  }
  users.value = [...users.value, ...res]
  if (res.length < limit) {
    return 0
  }
  return users.value[users.value.length - 1].id
})

const resetList = () => {
  users.value = []
  reset()
}
watch(
  () => route.name,
  () => {
    if (route.name == 'following') {
      loadFunc = following
    } else {
      loadFunc = follower
    }
    resetList()
    loadMore()
  },
  { immediate: true },
)
</script>

<template>
  <FollowUserList :users="users" :load-more="loadMore"></FollowUserList>
</template>

<style scoped lang="scss"></style>
