<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { profile } from '@/service/user.ts'
import type { User } from '@/types/user.ts'
import UserAvatar from '@/components/UserAvatar.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import InkDialog from '@/components/InkDialog.vue'
import UserInfoEditor from '@/views/user/UserInfoEditor.vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
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

const activeNav = ref('latest')
onMounted(() => {
  console.log('route.name: ', route.name)
  activeNav.value = route?.name as string
})

watch(activeNav, () => {
  router.push({
    name: activeNav.value,
  })
})

const showEdit = ref(false)
const handleEdit = () => {
  showEdit.value = true
}

watch(
  () => route.params.account,
  () => {
    // TODO reload user info
  },
)
</script>

<template>
  <div class="w-full relative flex flex-col items-center">
    <div class="w-full relative flex justify-center">
      <el-image
        :src="userInfo?.banner ?? defaultBanner"
        fit="cover"
        class="absolute w-full h-100"
        hide-on-click-modal
        :preview-src-list="[userInfo?.banner ?? defaultBanner]"
      ></el-image>
      <div class="max-screen-w absolute bottom-10 flex justify-between line-padding">
        <div class="flex justify-between items-center">
          <UserAvatar :size="80" class="mr-6" :border="true" :preview="true"></UserAvatar>
          <div>
            <div class="text-3xl text-white">{{ userInfo?.username }}</div>
            <div class="text-bg text-white mt-2">@{{ userInfo?.account }}</div>
          </div>
        </div>
        <div>
          <div>
            <el-button
              v-if="userStore.getActiveUser()?.user.id == userInfo?.id"
              size="large"
              round
              @click="handleEdit"
              >编辑个人资料
            </el-button>
            <el-button v-else size="large" round>关注</el-button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="max-screen-w mt-2 line-padding relative text-lg">
      <el-tabs v-model="activeNav">
        <el-tab-pane label="最新" name="latest"></el-tab-pane>
        <el-tab-pane label="点赞" name="likes"></el-tab-pane>
        <!--        <el-tab-pane label="收藏" name="collection"></el-tab-pane>-->
        <el-tab-pane label="浏览" name="views"></el-tab-pane>
      </el-tabs>
      <div class="absolute right-10 top-3 flex label-text-color">
        <div
          @click="activeNav = 'following'"
          :class="['cursor-pointer', activeNav == 'following' ? 'active-color' : '']"
        >
          正在关注{{ userInfo?.following }}
        </div>
        <div
          @click="activeNav = 'followers'"
          :class="['ml-8 cursor-pointer', activeNav == 'followers' ? 'active-color' : '']"
        >
          关注者{{ userInfo?.followers }}
        </div>
      </div>
    </div>
    <div class="max-screen-w flex justify-center mt-4">
      <div class="max-screen-w line-padding">
        <router-view></router-view>
      </div>
    </div>
    <InkDialog v-model="showEdit" title="编辑个人资料">
      <UserInfoEditor :user="userInfo"></UserInfoEditor>
    </InkDialog>
  </div>
</template>

<style scoped lang="scss">
.active-color {
  color: var(--primary-color);
}
</style>
