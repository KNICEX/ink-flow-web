<template>
  <div class="max-screen-w flex items-start">
    <div class="flex-1 h-full">
      <div class="h-10 line-padding home-nav bg-white dark:bg-[#141414]">
        <HomeNav></HomeNav>
      </div>
      <div class="line-padding relative home-list">
        <!--        <InkList></InkList>-->
        <TwitterStyleInkList></TwitterStyleInkList>
      </div>
    </div>
    <el-aside width="20rem" class="sticky-top line-padding ml-10 ink-aside">
      <HomeAside></HomeAside>
    </el-aside>
  </div>
</template>
<script setup lang="ts">
import HomeNav from '@/views/home/HomeNav.vue'
import HomeAside from '@/views/home/HomeAside.vue'
import InkList from '@/components/list/ink/InkList.vue'
import TwitterStyleInkList from '@/components/list/ink/TwitterStyleInkList.vue'
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
</style>
