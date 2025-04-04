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
const route = useRoute()
const router = useRouter()

const searchInputRef = useTemplateRef<InstanceType<typeof InkSearch>>('searchInputRef')

const inks = ref<Ink[]>([])
const comments = ref<Comment[]>([])
const users = ref<User[]>([])

const searchTarget = ref('ink')
let searchKey = ''
let offset = 0
const limit = 25

const handleTargetChange = () => {
  router.push({
    query: {
      key: route.query.key,
      type: searchTarget.value,
    },
  })
}

const reset = () => {
  offset = 0
  inks.value = []
  comments.value = []
  users.value = []
}

const doSearch = async (key: string, type: string) => {
  switch (type) {
    case 'ink': {
      const res = await searchInk({
        keyword: key,
        offset,
        limit,
      })
      inks.value.push(...res)
      break
    }
    case 'comment': {
      const res = await searchComment({
        keyword: key,
        offset,
        limit,
      })
      comments.value.push(...res)
      break
    }
    case 'user': {
      const res = await searchUser({
        keyword: key,
        offset,
        limit,
      })
      users.value.push(...res)
      break
    }
    default:
      console.error('Unknown search type: ', type)
  }
}

watch(
  () => route.query,
  () => {
    console.log('search view query: ', route.query)
    const key = decodeURIComponent(parseRouteQuery(route.query.key))
    let type = parseRouteQuery(route.query.type)
    if (type == '') {
      type = 'ink'
    }
    searchKey = key
    reset()
    if (searchInputRef.value) {
      searchInputRef.value.setValue(key)
      searchTarget.value = type
    } else {
      nextTick(() => {
        searchInputRef.value?.setValue(key)
        searchTarget.value = type
      })
    }
    doSearch(key, type)
  },
  {
    immediate: true,
  },
)

const loadMore = () => {
  offset++
  doSearch(searchKey, searchTarget.value)
}
</script>

<template>
  <div class="max-screen-w line-padding">
    <div class="mb-2 sticky-top z-1 white-bg">
      <div class="max-w-140 mb-4"><InkSearch ref="searchInputRef"></InkSearch></div>
      <el-tabs v-model="searchTarget" @tab-change="handleTargetChange">
        <!--        <el-tab-pane label="热门" name="hot"></el-tab-pane>-->
        <el-tab-pane label="内容" name="ink"></el-tab-pane>
        <el-tab-pane label="用户" name="user"></el-tab-pane>
        <el-tab-pane label="回复" name="reply"></el-tab-pane>
      </el-tabs>
    </div>
    <UserList v-infinite-scroll="loadMore" v-if="searchTarget == 'user'" :users="users"></UserList>
    <CommentSearchList
      :comments="comments"
      v-infinite-scroll="loadMore"
      v-else-if="searchTarget == 'reply'"
    ></CommentSearchList>
    <InkList
      v-else
      v-infinite-scroll="loadMore"
      :inks="inks"
      :max-cols="5"
      empty-desc="没有相关结果"
    ></InkList>
  </div>
</template>

<style scoped lang="scss"></style>
