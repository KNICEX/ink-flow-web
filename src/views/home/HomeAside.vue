<template>
  <div class="flex flex-col justify-center pl-2 pt-2 h-[calc(100vh-var(--header-height))]">
    <div class="flex justify-between">
      <div>Twitter</div>
      <div>Github</div>
      <div>Youtube</div>
      <div>Facebook</div>
    </div>
    <!--    <div class="flex flex-col justify-center items-center mt-5">-->
    <!--      <el-statistic-->
    <!--        class="flex flex-col items-center"-->
    <!--        value-style="font-size:2rem"-->
    <!--        :value="totalInk"-->
    <!--      >-->
    <!--        <template #title>-->
    <!--          <div class="text-2xl">Total Inks</div>-->
    <!--        </template>-->
    <!--      </el-statistic>-->
    <!--    </div>-->
    <div class="mt-5">
      <InkSearch></InkSearch>
    </div>
    <div class="mt-4">
      <HotTagList />
    </div>
    <div class="mt-4">
      <RecommendUserList></RecommendUserList>
    </div>
  </div>
</template>
<script setup lang="ts">
import InkSearch from '@/components/InkSearch.vue'
import RecommendUserList from '@/components/list/user/RecommendUserList.vue'
import HotTagList from '@/components/tags/HotTagList.vue'
</script>
<style scoped lang="scss">
.round {
  border-radius: 2rem;
}
</style>
