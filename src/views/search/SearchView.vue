<script setup lang="ts">
import InkSearch from '@/components/InkSearch.vue'
import { useRoute } from 'vue-router'
import { nextTick, useTemplateRef, watch, ref } from 'vue'
import InkList from '@/components/list/ink/InkList.vue'
import UserList from '@/components/list/user/UserList.vue'
const route = useRoute()

const searchInputRef = useTemplateRef<InstanceType<typeof InkSearch>>('searchInputRef')

watch(
  () => route.query,
  () => {
    console.log('search view query: ', route.query)
    if (searchInputRef.value) {
      searchInputRef.value.setValue(route.query.key as string)
    } else {
      nextTick(() => {
        searchInputRef.value?.setValue(route.query.key as string)
      })
    }
  },
  {
    immediate: true,
  },
)
const searchTarget = ref('hot')
</script>

<template>
  <div class="max-screen-w line-padding">
    <div class="mb-6 sticky-top z-1 white-bg">
      <div class="max-w-140 mb-4"><InkSearch ref="searchInputRef"></InkSearch></div>
      <el-tabs v-model="searchTarget">
        <el-tab-pane label="热门" name="hot"></el-tab-pane>
        <el-tab-pane label="最新" name="latest"></el-tab-pane>
        <el-tab-pane label="用户" name="user"></el-tab-pane>
        <el-tab-pane label="回复" name="reply"></el-tab-pane>
      </el-tabs>
    </div>
    <UserList v-if="searchTarget == 'user'"></UserList>
    <InkList v-else :max-cols="5"></InkList>
  </div>
</template>

<style scoped lang="scss"></style>
