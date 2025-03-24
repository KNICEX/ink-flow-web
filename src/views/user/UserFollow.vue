<script setup lang="ts">
import { demoUsers } from '@/mock/demo_data.ts'
import FollowUserList from '@/components/list/user/FollowUserList.vue'
</script>

<template>
  <FollowUserList :users="demoUsers()"></FollowUserList>
</template>

<style scoped lang="scss"></style>
