<script setup lang="ts">
import { ref } from 'vue'
import InkList from '@/components/list/ink/InkList.vue'
const activeIndex = ref(0)
</script>

<template>
  <div class="flex">
    <div class="w-60">
      <div class="sticky top-44 pr-4">
        <!--        <div>默认收藏</div>-->
        <!--        <div>anime</div>-->
        <!--        <div>comic</div>-->
        <!--        <div>电影</div>-->
        <!--        <div>电影</div>-->
        <!--        <div>电影</div>-->
        <el-menu :default-active="activeIndex">
          <el-menu-item :index="0"> <span class="text-base">默认收藏</span></el-menu-item>
          <el-menu-item :index="1">
            <div class="flex justify-between items-center w-full">
              <span class="text-base">anime</span>
              <span>2</span>
            </div>
          </el-menu-item>
          <el-menu-item :index="2">
            <span class="text-base">comic</span>
          </el-menu-item>
          <el-menu-item :index="3">
            <span class="text-base">电影</span>
          </el-menu-item>
          <el-menu-item :index="4">
            <span class="text-base">电影</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="flex-1">
      <InkList :max-cols="4"></InkList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-menu {
  border: none;
}
.el-menu-item {
  border-radius: 0.8rem;
}
.is-active {
  background-color: var(--el-color-primary-light-9);
}
</style>
