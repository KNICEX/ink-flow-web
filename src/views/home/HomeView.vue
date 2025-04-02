<template>
  <div class="max-screen-w flex items-start">
    <div class="flex-1 h-full">
      <div class="h-13 line-padding home-nav bg-white dark:bg-[#141414]">
        <el-tabs class="demo-tabs" :model-value="activeNav" @tab-change="handleNavChange">
          <el-tab-pane label="推荐" name="recommend"></el-tab-pane>
          <el-tab-pane label="热门" name="hot"></el-tab-pane>
          <el-tab-pane label="关注" name="follow"></el-tab-pane>
          <!--          <el-tab-pane label="最新" name="latest"></el-tab-pane>-->
        </el-tabs>
      </div>
      <div class="line-padding relative home-list">
        <!--        <InkList></InkList>-->
        <TwitterStyleInkList :inks="inks" @load-more="loadMore"></TwitterStyleInkList>
      </div>
    </div>
    <el-aside width="20rem" class="sticky-top line-padding ml-10 ink-aside">
      <HomeAside></HomeAside>
    </el-aside>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HomeAside from '@/views/home/HomeAside.vue'
import InkList from '@/components/list/ink/InkList.vue'
import TwitterStyleInkList from '@/components/list/ink/TwitterStyleInkList.vue'
import { demoInks } from '@/mock/demo_data.ts'
import { useProvideInkInteractiveHandler } from '@/hook/interactive.ts'
const inks = ref(demoInks())

useProvideInkInteractiveHandler(inks)

const activeNav = ref('recommend')
const handleNavChange = () => {}

const loadMore = () => {
  inks.value.push(...demoInks())
}
</script>
<style scoped lang="scss">
.home-nav {
  position: sticky;
  top: 6rem;
  z-index: 1;
}

.ink-aside {
  @media (max-width: 1024px) {
    display: none;
  }
}
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}
</style>
