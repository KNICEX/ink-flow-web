<script setup lang="ts">
import { computed } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import InkPopover from '@/components/popover/InkPopover.vue'
import type { Comment } from '@/types/comment.ts'
import MoreOperation from '@/components/button/MoreOperation.vue'
import UserCard from '@/components/UserCard.vue'

const props = defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
  isChild: {
    type: Boolean,
    default: false,
  },
  replyAble: {
    type: Boolean,
    default: true,
  },
  showStats: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['reply', 'like', 'favorite'])

const handleReply = () => {
  emit('reply', props.comment)
}

const handleLike = () => {
  emit('like', props.comment)
}

const formattedDate = computed(() => {
  if (!props.comment.createdAt) return ''

  const date = new Date(props.comment.createdAt)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

const likeIconClass = computed(() => {
  return props.comment.liked ? 'text-red-500' : 'text-gray-500'
})
</script>

<template>
  <div
    class="flex p-4 rounded-xl bg-white dark:bg-gray-800 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <InkPopover :show-after="300">
      <template #reference>
        <UserAvatar :hover-mask="true" :src="comment.commentator.avatar" :size="46" />
      </template>
      <template #content>
        <UserCard :user="comment.commentator"></UserCard>
      </template>
    </InkPopover>
    <div class="w-full ml-4">
      <div class="flex items-start">
        <div class="flex-grow">
          <div class="flex justify-between">
            <div class="text-lg">
              <router-link :to="`/user/${comment.commentator.account}`" class="text-lg">
                {{ comment.commentator.username }}
              </router-link>
              <el-link class="text-gray-500 text-lg ml-1"
                >@{{ comment.commentator.account }}
              </el-link>
              <span class="ml-3 text-sm text-gray-500">{{ formattedDate }}</span>
            </div>

            <InkPopover padding="0" trigger="click">
              <template #reference>
                <MoreOperation :horizon="true"></MoreOperation>
              </template>
              <template #content>
                <div class="min-w-24">
                  <div class="popover-button">复制</div>
                  <div class="popover-button">举报</div>
                </div>
              </template>
            </InkPopover>
          </div>
        </div>
      </div>

      <div>
        <div
          v-if="isChild && comment.parent && comment.parent.id != comment.root?.id"
          class="text-gray-500 mb-2"
        >
          回复
          <router-link
            class="text-blue-500 hover:underline"
            :to="`/user/${comment.parent.commentator.account}`"
          >
            @{{ comment.parent.commentator.username }}
          </router-link>
        </div>

        <div class="leading-relaxed mb-3 break-words">{{ comment.payload.content }}</div>

        <div
          v-if="comment.payload.images && comment.payload.images.length > 0"
          class="flex flex-wrap gap-2 mt-3"
        >
          <div v-for="(image, index) in comment.payload.images" :key="index" class="relative">
            <el-image
              :src="image"
              fit="cover"
              :preview-src-list="comment.payload.images"
              :initial-index="index"
              preview-teleported
              class="w-28 h-28 rounded-lg object-cover cursor-pointer border border-gray-200 dark:border-gray-600 transition-transform duration-200 hover:scale-105"
              @click.stop="handleReply()"
            />
          </div>
        </div>
      </div>

      <div class="flex mt-4" v-if="showStats">
        <div
          class="flex items-center mr-6 cursor-pointer text-gray-500 hover:text-blue-500"
          @click="handleReply()"
        >
          <span class="material-symbols-outlined text-xl">chat_bubble_outline</span>
          <span v-if="comment.children && comment.children.length > 0" class="text-sm ml-1">
            {{ comment.children.length }}
          </span>
        </div>

        <div
          class="flex items-center mr-6 cursor-pointer hover:text-red-500"
          :class="likeIconClass"
          @click="handleLike()"
        >
          <span class="material-symbols-outlined text-xl">favorite</span>
          <span v-if="comment.likeCnt > 0" class="text-sm ml-1">
            {{ comment.likeCnt }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
