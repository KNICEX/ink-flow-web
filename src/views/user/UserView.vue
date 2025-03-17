<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { profile } from '@/service/user.ts'
import type { User } from '@/types/user.ts'
import UserAvatar from '@/components/UserAvatar.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import InkList from '@/components/list/InkList.vue'

const userStore = useUserStore()
const route = useRoute()
const userInfo = ref<User | null>(null)
onBeforeMount(async () => {
  userInfo.value = await profile({
    account: route.params.account as string,
  })
})

const parseFaviconUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url
  }
  return `https://lzacg.org${url}`
}
const defaultBanner = 'https://lzacg.org/wp-content/uploads/2021/07/pid-67767892log3_p2-scaled.webp'

const activeNav = ref('first')
const handleNavClick = (nav: string) => {}
</script>

<template>
  <div class="w-full relative flex flex-col items-center">
    <div class="w-full relative flex justify-center">
      <el-image
        :src="userInfo?.banner ?? defaultBanner"
        fit="cover"
        class="absolute w-full h-100"
      ></el-image>
      <div class="max-screen-w absolute bottom-10 flex justify-between line-padding">
        <div class="flex w-54 justify-between items-center">
          <UserAvatar :size="100" :border="true"></UserAvatar>
          <div>
            <div class="text-3xl text-white">{{ userInfo?.username }}</div>
            <div class="text-bg text-white mt-2">@{{ userInfo?.account }}</div>
          </div>
        </div>
        <div>
          <div>
            <el-button v-if="userStore.getActiveUser()?.user.id == userInfo?.id" size="large" round
              >编辑个人资料
            </el-button>
            <el-button v-else size="large" round>关注</el-button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="max-screen-w mt-2 line-padding">
      <el-tabs v-model="activeNav" @tab-click="handleNavClick">
        <el-tab-pane label="最新" name="first"></el-tab-pane>
        <el-tab-pane label="点赞" name="second"></el-tab-pane>
        <el-tab-pane label="收藏" name="third"></el-tab-pane>
        <el-tab-pane label="浏览" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="flex justify-center mt-4">
      <div class="max-screen-w line-padding">
        <InkList :max-cols="4"></InkList>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
