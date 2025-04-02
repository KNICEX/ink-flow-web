<script setup lang="ts">
import { ref } from 'vue'
import CommentItem from './CommentItem.vue'
import type { Comment } from '@/types/comment.ts'
import { demoComments } from '@/mock/demo_data.ts'
import NoData from '@/components/empty/NoData.vue'
import CommentInput from '@/components/list/comment/CommentInput.vue'

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

const replyingComment = ref<Comment | null>(null)

const loadMore = () => {
  if (props.noMore || props.loading) return
  emit('load-more')
}

const emit = defineEmits(['load-more', 'reply', 'like', 'favorite', 'submit-comment'])

const handleReply = (comment: Comment) => {
  replyingComment.value = comment
  emit('reply', comment)
}

const handleLike = (comment: Comment) => {
  emit('like', comment)
}

const handleSubmitComment = (content: string, parentComment: Comment | null = null, images: string[] = []) => {
  emit('submit-comment', { content, parentComment, images })
  if (parentComment) {
    replyingComment.value = null
  }
}

const cancelReply = () => {
  replyingComment.value = null
}
</script>

<template>
  <div class="w-full" v-infinite-scroll="loadMore" :infinite-scroll-disabled="noMore || loading">
    <div class="mb-4">
      <CommentInput
        placeholder="发表你的评论..."
        @submit="(content, images) => handleSubmitComment(content, null, images)"
      />
    </div>

    <div v-if="comments.length === 0" class="py-8">
      <NoData></NoData>
    </div>
    <div v-else>
      <div v-for="comment in comments" :key="comment.id" class="mb-2 last:mb-0">
        <CommentItem :comment="comment" @reply="handleReply" @like="handleLike" />

        <div v-if="replyingComment && replyingComment.id === comment.id" class="ml-12 mt-2 mb-4">
          <CommentInput
            :placeholder="`回复 @${comment.commentator.username}...`"
            @submit="(content, images) => handleSubmitComment(content, comment, images)"
            @cancel="cancelReply"
            :show-cancel="true"
          />
        </div>

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
            />

            <div v-if="replyingComment && replyingComment.id === childComment.id" class="mt-2 mb-4">
              <CommentInput
                :placeholder="`回复 @${childComment.commentator.username}...`"
                @submit="(content, images) => handleSubmitComment(content, childComment, images)"
                @cancel="cancelReply"
                :show-cancel="true"
              />
            </div>
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
