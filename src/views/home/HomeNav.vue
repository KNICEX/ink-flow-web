<script setup lang="ts"></script>
<template>
  <div class="flex text-lg">
    <!--    <el-link>-->
    <!--      <span class="text-lg">推荐</span>-->
    <!--    </el-link>-->
    <!--    <el-link class="ml-4">-->
    <!--      <span class="text-lg">关注</span>-->
    <!--    </el-link>-->
    <!--    <el-link class="ml-4">-->
    <!--      <span class="text-lg">热门</span>-->
    <!--    </el-link>-->
    <!--    <el-link class="ml-4">-->
    <!--      <span class="text-lg">最新</span>-->
    <!--    </el-link>-->
    <el-tabs class="demo-tabs">
      <el-tab-pane label="User" name="first"></el-tab-pane>
      <el-tab-pane label="Config" name="second"></el-tab-pane>
      <el-tab-pane label="Role" name="third"></el-tab-pane>
      <el-tab-pane label="Task" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.el-menu--horizontal {
  --el-menu-horizontal-height: 2rem;
}
</style>
