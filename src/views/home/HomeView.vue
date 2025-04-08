<template>
  <div class="max-screen-w flex items-start">
    <div class="flex-1 h-full">
      <div class="line-padding z-1 white-bg">
        <el-tabs :model-value="activeNav" @tab-change="handleNavChange">
          <el-tab-pane label="推荐" name="recommend" lazy v-if="loggedIn">
            <HomeList type="recommend"></HomeList>
          </el-tab-pane>
          <el-tab-pane label="热门" name="hot" lazy>
            <HomeList type="hot"></HomeList>
          </el-tab-pane>
          <el-tab-pane label="关注" name="follow" lazy v-if="loggedIn">
            <HomeList type="follow"></HomeList>
          </el-tab-pane>
          <!--          <el-tab-pane label="最新" name="latest"></el-tab-pane>-->
        </el-tabs>
      </div>
      <!--      <div class="line-padding relative home-list">-->
      <!--        <InkList></InkList>-->
      <!--        <TwitterStyleInkList :inks="inks" @load-more="loadMore"></TwitterStyleInkList>-->
      <!--      </div>-->
    </div>
    <el-aside width="22rem" class="sticky-top line-padding ml-10 ink-aside hidden-scrollbar">
      <HomeAside></HomeAside>
    </el-aside>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import HomeAside from '@/views/home/HomeAside.vue'
import HomeList from '@/views/home/HomeList.vue'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()
const loggedIn = computed(() => {
  return userStore.getActiveUser()?.user.id != null
})

const activeNav = ref('recommend')
const handleNavChange = () => {
  console.log('nav: ', activeNav.value)
}
</script>
<style scoped lang="scss">
.ink-aside {
  @media (max-width: 1024px) {
    display: none;
  }
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}

:deep(.el-tabs__header) {
  position: sticky;
  top: var(--header-height);
  background-color: white;
}
</style>
