<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchKey = ref('')
</script>

<template>
  <el-input
    v-model="searchKey"
    size="large"
    clearable
    class="hover:shadow-md rounded-input h-12"
    placeholder="Search what you want"
    :prefix-icon="Search"
  />
</template>

<style scoped lang="scss">

</style>
