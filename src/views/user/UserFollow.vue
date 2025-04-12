<script setup lang="ts">
import { ref, watch } from 'vue'
import FollowUserList from '@/components/list/user/FollowUserList.vue'
import { wrapMaxIdPagedFunc } from '@/utils/pagedLoadWrap.ts'
import { follower, following } from '@/service/relation.ts'
import type { User } from '@/types/user.ts'
import { useRoute } from 'vue-router'
import { useProvideFollowHandler } from '@/hook/follow.ts'
const route = useRoute()

const props = defineProps({
  uid: {
    type: Number,
    default: 0,
  },
})

const limit = 15
const users = ref<User[]>([])

const { loadMore, reset, loading } = wrapMaxIdPagedFunc(async (maxId: number) => {
  if (props.uid == 0) {
    return
  }

  let res: User[]
  if (route.name == 'following') {
    res = await following(props.uid, { maxId, limit })
  } else {
    res = await follower(props.uid, { maxId, limit })
  }
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
    resetList()
    loadMore()
  },
)

watch(
  () => props.uid,
  () => {
    resetList()
    loadMore()
  },
  {
    immediate: true,
  },
)
useProvideFollowHandler(users)
</script>

<template>
  <FollowUserList :users="users" :loading="loading" :load-more="loadMore"></FollowUserList>
</template>

<style scoped lang="scss"></style>
