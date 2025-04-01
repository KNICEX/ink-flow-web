<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import UserCard from '@/components/UserCard.vue'
import InkPopover from '@/components/popover/InkPopover.vue'
import type { Ink } from '@/types/ink.ts'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import InkInteractive from '@/components/ink/InkInteractive.vue'
import { formatDate } from '@/utils/date.ts'

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
  previewLength: {
    type: Number,
    default: 150,
  },
})

const contentPreview = computed(() => {
  // 从文章内容中提取文本预览
  // 这里假设内容存储在ink.content中，根据实际情况可能需要调整
  if (!props.ink.contentHtml) return ''
  const text = props.ink.contentHtml.replace(/<[^>]*>/g, '') // 简单去除HTML标签
  return text.length > props.previewLength ? text.substring(0, props.previewLength) + '...' : text
})

const emit = defineEmits(['on-cover-click'])
const handleCoverClick = () => {
  emit('on-cover-click', props.ink.id)
}

const handleItemClick = () => {
  emit('on-cover-click', props.ink.id)
}

const handleToUserHome = () => {
  router.push(`/user/${props.ink.author.account}`)
}

const formattedDate = computed(() => {
  // 格式化日期，这里简单返回，实际应用中可能需要使用日期格式化函数
  return formatDate(props.ink.createdAt)
})
</script>

<template>
  <div
    class="flex border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
    @click="handleItemClick"
  >
    <div class="mr-3">
      <InkPopover place="bottom" :show-after="300">
        <template #reference>
          <div class="flex items-center">
            <UserAvatar :size="48" :src="ink.author.avatar"></UserAvatar>
          </div>
        </template>
        <template #content>
          <UserCard :user="ink.author"></UserCard>
        </template>
      </InkPopover>
    </div>
    <!-- 作者信息 -->
    <div>
      <div class="flex items-center" v-if="showAuthor" @click.stop="handleToUserHome">
        <div class="flex">
          <span class="font-semibold">{{ ink.author.username }}</span>
          <span class="text-gray-500 ml-2 flex items-end">@{{ ink.author.account }}</span>
          <span class="text-gray-500 ml-2 flex items-end">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- 标题 -->
      <h3 class="text-lg">{{ ink.title }}</h3>

      <!-- 内容预览 -->
      <p class="text-gray-700 dark:text-gray-300 mb-3">{{ contentPreview }}</p>

      <!-- 封面图片 -->
      <div v-if="ink.cover" class="mb-3 flex">
        <el-image
          @click.stop="handleCoverClick"
          fit="contain"
          class="ink-image transition duration-300"
          loading="lazy"
          :z-index="10000"
          hide-on-click-modal
          :preview-src-list="[ink.cover]"
          :src="ink.cover"
        >
        </el-image>
      </div>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mt-2" v-if="ink.tags && ink.tags.length">
        <el-tag v-for="tag in ink.tags" :key="tag" size="small" type="info">#{{ tag }}</el-tag>
      </div>

      <!-- 互动数据 -->
      <InkInteractive class="mt-2" :interactive="ink.interactive"></InkInteractive>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ink-image {
  max-height: 30rem;
  max-width: 100%;
  width: auto;
  height: auto;
  &:deep(.el-image__inner) {
    width: auto;
    height: 100%;
    border-radius: 0.8rem;
  }
}
</style>
