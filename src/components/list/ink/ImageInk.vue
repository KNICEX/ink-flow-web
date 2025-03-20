<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import UserCard from '@/components/UserCard.vue'
import InkPopover from '@/components/popover/InkPopover.vue'
import type { Ink } from '@/types/ink.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  ink: {
    type: Object as () => Ink,
    required: true,
  },
  showAuthor: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['on-cover-click'])
const handleCoverClick = () => {
  console.log('cover click')
  emit('on-cover-click', props.ink.id)
}
const handleToUserHome = () => {
  router.push(`/user/${props.ink.author.account}`)
}
</script>

<template>
  <div class="rounded-1 cursor-pointer">
    <div class="flex flex-col justify-between">
      <div class="overflow-hidden rounded-xl border border-gray-200 aspect-square">
        <el-image
          v-if="ink.cover != ''"
          @click="handleCoverClick"
          class="w-full aspect-square hover:scale-105 transition duration-300"
          loading="lazy"
          fit="cover"
          :src="ink.cover"
        >
        </el-image>
        <div
          v-else
          @click="handleCoverClick"
          class="flex justify-center hover:scale-115 transition duration-300 text-xl items-center w-full aspect-square"
        >
          <div>{{ ink.title }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-2" @click="handleToUserHome">
      <span>Hello this is an ink</span>
      <div class="flex" v-if="showAuthor">
        <InkPopover>
          <template #reference>
            <div class="flex items-center mt-2">
              <UserAvatar class="mr-3" :size="25" :src="ink.author.avatar"></UserAvatar>
              <span>Chtholly</span>
            </div>
          </template>
          <template #content>
            <UserCard :user="ink.author"></UserCard>
          </template>
        </InkPopover>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
