<template>
  <div class="h-full flex-col">
    <el-popover></el-popover>
    <div class="flex fixed w-full header white-bg z-10 top-0 items-center justify-center">
      <HeaderView class="line-padding"> </HeaderView>
    </div>
    <div class="flex flex-1 justify-center pt-[6rem]">
      <router-view> </router-view>
    </div>
    <div class="border-t-1 border-gray-200 mt-10 flex justify-center">
      <FooterView></FooterView>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeaderView from '@/views/header/HeaderView.vue'
import FooterView from '@/views/FooterView.vue'
</script>
<style scoped lang="scss">
.header {
  height: 6rem;
}

.home-nav {
  position: sticky;
  top: 6rem;
  z-index: 1;
}

.sticky-top {
  position: sticky;
  top: 6rem;
}

.ink-aside {
  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
