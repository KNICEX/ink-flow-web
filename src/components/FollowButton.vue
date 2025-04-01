<script setup lang="ts">
import { ref } from 'vue'
import { cancelFollow, follow } from '@/service/user.ts'

const props = defineProps({
  uid: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    default: 'default',
  },
  followed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['followed', 'cancelFollowed'])
const followTip = ref('正在关注')
const followedColor = ref('')
const handleMouseover = () => {
  followTip.value = '取消关注'
  followedColor.value = 'red'
}
const handleMouseLeave = () => {
  followTip.value = '正在关注'
  followedColor.value = ''
}

const handleFollow = async () => {
  await follow(props.uid)
  emit('followed', props.uid)
}
const handleCancelFollow = async () => {
  await cancelFollow(props.uid)
  emit('cancelFollowed', props.uid)
}
</script>

<template>
  <el-button
    v-if="followed"
    :color="followedColor"
    @click="handleCancelFollow"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseLeave"
    :size="size"
    plain
    round
  >
    {{ followTip }}
  </el-button>
  <el-button v-else color="black" :size="size" round @click="handleFollow"> 关注 </el-button>
</template>

<style scoped lang="scss"></style>
