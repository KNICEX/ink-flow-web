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
    <a>
      <div>
        <el-image
          v-if="ink.cover != ''"
          @click="handleCoverClick"
          class="rounded-xl w-full aspect-square"
          loading="lazy"
          fit="cover"
          :src="ink.cover"
        >
        </el-image>
        <div
          v-else
          @click="handleCoverClick"
          class="flex justify-center border border-gray-200 text-xl items-center rounded-xl w-full aspect-square"
        >
          <div>{{ ink.title }}</div>
        </div>
      </div>
      <div class="flex flex-col" @click="handleToUserHome">
        <span>Hello this is an ink</span>
        <div class="flex">
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
    </a>
  </div>
</template>

<style scoped lang="scss"></style>
