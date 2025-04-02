<script setup lang="ts">
import { demoUsers } from '@/mock/demo_data.ts'
import UserSimpleItem from '@/components/list/user/UserSimpleItem.vue'
import { useProvideFollowHandler } from '@/hook/follow.ts'
import { ref } from 'vue'

const users = ref(demoUsers(5))

useProvideFollowHandler(users)
</script>

<template>
  <div>
    <UserSimpleItem v-for="user in users" :user="user" :key="user.id"></UserSimpleItem>
    <div class="text-center mt-2">
      <el-link type="primary">
        <span class="text-base">展示更多</span>
      </el-link>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
