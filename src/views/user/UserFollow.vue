<script setup lang="ts">
import { demoUsers } from '@/mock/demo_data.ts'
import UserList from '@/components/list/user/UserList.vue'
</script>

<template>
  <UserList :users="demoUsers()"></UserList>
</template>

<style scoped lang="scss"></style>
