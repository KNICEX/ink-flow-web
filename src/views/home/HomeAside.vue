<template>
  <div class="flex flex-col justify-center pl-2 pt-2">
    <div class="flex justify-between">
      <div>Twitter</div>
      <div>Github</div>
      <div>Youtube</div>
      <div>Facebook</div>
    </div>
    <div class="flex flex-col justify-center items-center mt-5">
      <el-statistic
        class="flex flex-col items-center"
        value-style="font-size:2rem"
        :value="totalInk"
      >
        <template #title>
          <div class="text-2xl">Total Inks</div>
        </template>
      </el-statistic>
    </div>
    <div class="mt-5">
      <InkSearch></InkSearch>
    </div>
    <div class="mt-8">
      <div class="text-center text-xl">为你推荐的创作者</div>
      <div class="mt-4">
        <UserItem
          v-for="user in recommendUsers"
          :user="user"
          :key="user.id"
          @followed="handleFollowed"
          @cancel-followed="handleCancelFollowed"
        ></UserItem>
      </div>
      <div class="text-center mt-2">
        <el-link type="primary">
          <span class="text-base">展示更多</span>
        </el-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserItem from '@/components/UserItem.vue'
import InkSearch from '@/components/InkSearch.vue'
import { demoUsers } from '@/mock/demo_data.ts'
import type { User } from '@/types/user.ts'
const recommendUsers = ref<User[]>([])
onMounted(() => {
  recommendUsers.value = demoUsers()
})
const totalInk = ref(2332)
const handleFollowed = (id: number) => {
  for (let i = 0; i < recommendUsers.value.length; i++) {
    if (recommendUsers.value[i].id == id) {
      recommendUsers.value[i].followed = true
      break
    }
  }
}
const handleCancelFollowed = (id: number) => {
  for (let i = 0; i < recommendUsers.value.length; i++) {
    if (recommendUsers.value[i].id == id) {
      recommendUsers.value[i].followed = false
      break
    }
  }
}
</script>
<style scoped lang="scss">
.round {
  border-radius: 2rem;
}
</style>
