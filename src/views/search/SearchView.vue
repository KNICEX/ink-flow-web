<script setup lang="ts">
import InkSearch from '@/components/InkSearch.vue'
import { useRoute, useRouter } from 'vue-router'
import { nextTick, useTemplateRef, watch, ref } from 'vue'
import InkList from '@/components/list/ink/InkList.vue'
import UserList from '@/components/list/user/UserList.vue'
import CommentSearchList from '@/components/list/comment/CommentSearchList.vue'
import { searchComment, searchInk, searchUser } from '@/service/search.ts'
import type { Ink } from '@/types/ink.ts'
import type { Comment } from '@/types/comment.ts'
import type { User } from '@/types/user.ts'
import { parseRouteQuery } from '@/utils/parse.ts'
import { wrapOffsetPagedFunc } from '@/utils/pagedLoadWrap.ts'
import { useProvideFollowHandler } from '@/hook/follow.ts'
import type { TabPaneName } from 'element-plus'
const route = useRoute()
const router = useRouter()

const searchInputRef = useTemplateRef<InstanceType<typeof InkSearch>>('searchInputRef')

const inks = ref<Ink[]>([])
const comments = ref<Comment[]>([])
const users = ref<User[]>([])

useProvideFollowHandler(users)

const searchTarget = ref('ink')
let searchKey = ''
const limit = 15

const scrollTopMap = new Map<string, number>([
  ['ink', 0],
  ['user', 0],
  ['reply', 0],
])

const handleBeforeLeave = (active: TabPaneName, old: TabPaneName) => {
  // 记录滚动条位置
  console.log('scrollTop', document.documentElement.scrollTop || document.body.scrollTop)
  scrollTopMap.set(old as string, document.documentElement.scrollTop || document.body.scrollTop)
  return true
}

const handleTargetChange = (active: TabPaneName) => {
  // 恢复滚动条位置
  console.log('scrollTop', scrollTopMap, 'active', active)
  const scrollTop = scrollTopMap.get(active as string)

  router
    .push({
      query: {
        key: route.query.key,
        type: searchTarget.value,
      },
    })
    .then(() => {
      if (scrollTop != undefined) {
        nextTick(() => {
          document.documentElement.scrollTop = scrollTop
        })
      }
    })
}

const {
  loadMore: loadMoreInk,
  reset: resetInk,
  loading: loadingInk,
} = wrapOffsetPagedFunc(async (offset: number) => {
  console.log('load more ink', offset)
  if (searchKey == '') {
    return
  }
  const res = await searchInk({
    keyword: searchKey,
    offset,
    limit,
  })
  if (res.length == 0) {
    return 0
  }
  inks.value = [...inks.value, ...res]
  return res.length
}, limit)

const {
  loadMore: loadMoreComment,
  reset: resetComment,
  loading: loadingComment,
} = wrapOffsetPagedFunc(async (offset: number) => {
  console.log('load more comment', offset)
  if (searchKey == '') {
    return
  }
  const res = await searchComment({
    keyword: searchKey,
    offset,
    limit,
  })
  if (res.length == 0) {
    return 0
  }
  comments.value = [...comments.value, ...res]
  return res.length
}, limit)

const {
  loadMore: loadMoreUser,
  reset: resetUser,
  loading: loadingUser,
} = wrapOffsetPagedFunc(async (offset: number) => {
  console.log('load more user', offset)
  if (searchKey == '') {
    return
  }
  const res = await searchUser({
    keyword: searchKey,
    offset,
    limit,
  })
  if (res.length == 0) {
    return 0
  }
  users.value = [...users.value, ...res]
  return res.length
}, limit)

const reset = () => {
  resetInk()
  resetComment()
  resetUser()
  inks.value = []
  comments.value = []
  users.value = []
  scrollTopMap.set('ink', 0)
  scrollTopMap.set('user', 0)
  scrollTopMap.set('reply', 0)
}

watch(
  () => route.query.key,
  () => {
    console.log('trigger key change')
    reset()
    const key = decodeURIComponent(parseRouteQuery(route.query.key))
    let type = parseRouteQuery(route.query.type)

    console.log('search key', key)
    console.log('search type', type)

    if (type == '') {
      type = 'ink'
    }
    searchTarget.value = type
    console.log('search Type', type)
    searchKey = key

    if (searchInputRef.value) {
      console.log('set search target ', type)
      searchInputRef.value.setValue(key)
    } else {
      nextTick(() => {
        console.log('set search target next tick', type)
        searchInputRef.value?.setValue(key)
      })
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="max-screen-w line-padding">
    <div class="mb-2 sticky-top z-1 white-bg">
      <div class="max-w-140 mb-4"><InkSearch ref="searchInputRef"></InkSearch></div>
      <el-tabs
        v-model="searchTarget"
        @tab-change="handleTargetChange"
        :before-leave="handleBeforeLeave"
      >
        <!--        <el-tab-pane label="热门" name="hot"></el-tab-pane>-->
        <el-tab-pane lazy label="内容" name="ink">
          <InkList
            :load-more="loadMoreInk"
            :loading="loadingInk"
            :inks="inks"
            :max-cols="5"
            empty-desc="没有相关结果"
          ></InkList>
        </el-tab-pane>
        <el-tab-pane lazy label="用户" name="user">
          <UserList :load-more="loadMoreUser" :loading="loadingUser" :users="users"></UserList>
        </el-tab-pane>
        <el-tab-pane lazy label="回复" name="reply">
          <CommentSearchList
            :comments="comments"
            :loading="loadingComment"
            :load-more="loadMoreComment"
          ></CommentSearchList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  position: sticky;
  top: var(--header-height);
  background-color: var(--white-background);
}
</style>
