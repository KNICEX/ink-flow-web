<script setup lang="ts">
import { ref } from 'vue'
import CommentItem from './CommentItem.vue'
import type { Comment } from '@/types/comment.ts'
import { demoComments } from '@/mock/demo_data.ts'
import NoData from '@/components/empty/NoData.vue'

const props = defineProps({
  comments: {
    type: Array as () => Comment[],
    default: () => demoComments(5),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  noMore: {
    type: Boolean,
    default: false,
  },
})

const loadMore = () => {
  if (props.noMore || props.loading) return
  emit('load-more')
}

const emit = defineEmits(['load-more', 'reply', 'like', 'favorite'])

const handleReply = (comment: Comment) => {
  emit('reply', comment)
}

const handleLike = (comment: Comment) => {
  emit('like', comment)
}

const handleFavorite = (comment: Comment) => {
  emit('favorite', comment)
}
</script>

<template>
  <div class="w-full" v-infinite-scroll="loadMore" :infinite-scroll-disabled="noMore || loading">
    <div v-if="comments.length === 0" class="py-8">
      <NoData></NoData>
    </div>
    <div v-else>
      <div v-for="comment in comments" :key="comment.id" class="mb-2 last:mb-0">
        <CommentItem
          :comment="comment"
          @reply="handleReply"
          @like="handleLike"
          @favorite="handleFavorite"
        />

        <!-- 子评论 (平铺布局) -->
        <div
          v-if="comment.children && comment.children.length > 0"
          class="ml-12 mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
        >
          <div
            v-for="childComment in comment.children"
            :key="childComment.id"
            class="mb-4 last:mb-0"
          >
            <CommentItem
              :comment="childComment"
              :is-child="true"
              :show-child="false"
              @reply="handleReply"
              @like="handleLike"
              @favorite="handleFavorite"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="py-4">
      <el-skeleton :rows="3" animated />
    </div>

    <div v-if="noMore && comments.length > 0" class="py-2 text-gray-500 text-sm">
      <el-divider>没有更多评论了</el-divider>
    </div>
  </div>
</template>
<style lang="scss"></style>
