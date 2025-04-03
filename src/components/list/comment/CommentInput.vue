<script setup lang="ts">
import { ref } from 'vue'
import type { UploadRawFile } from 'element-plus'
import InkUpload from '@/components/upload/InkUpload.vue'

defineProps({
  placeholder: {
    type: String,
    default: '写下你的评论...',
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const commentContent = ref('')
const isSubmitting = ref(false)
// 存储上传的图片URL
const images = ref<string[]>([])

// 处理图片上传
const handleImageUpload = (file: UploadRawFile) => {
  // 模拟上传并获取URL
  // 实际应用中，需要调用后端上传API并获取图片URL
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    if (e.target?.result) {
      images.value.push(e.target.result as string)
    }
  }
}

// 移除图片
const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

const submitComment = () => {
  if (!commentContent.value.trim() && images.value.length === 0) return

  isSubmitting.value = true

  // 提交评论，增加images参数
  emit('submit', {
    content: commentContent.value,
    images: images.value,
  })

  // 重置
  commentContent.value = ''
  images.value = []
  isSubmitting.value = false
}

const handleCancel = () => {
  commentContent.value = ''
  images.value = []
  emit('cancel')
}
</script>

<template>
  <div class="rounded-xl p-4 border border-gray-200 dark:border-gray-700">
    <el-input
      v-model="commentContent"
      :placeholder="placeholder"
      type="textarea"
      :rows="3"
      resize="none"
      class="mb-3"
    />

    <!-- 显示已上传的图片 -->
    <div v-if="images.length > 0" class="flex flex-wrap gap-2 mb-3">
      <div v-for="(image, index) in images" :key="index" class="relative">
        <el-image
          :src="image"
          fit="cover"
          class="w-20 h-20 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
        />
        <button
          @click="removeImage(index)"
          class="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
          ×
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <!-- 图片上传按钮 -->
      <div>
        <el-tooltip content="添加图片" placement="top">
          <el-button type="primary" text circle>
            <span class="material-symbols-outlined">image</span>
          </el-button>
        </el-tooltip>
        <!-- 隐藏的上传组件 -->
        <div class="hidden">
          <InkUpload
            ref="uploadRef"
            :multiple="true"
            file-type="image"
            :max="9"
            @upload="handleImageUpload"
          />
        </div>
      </div>

      <div class="flex">
        <el-button v-if="showCancel" @click="handleCancel" class="mr-2">取消</el-button>
        <el-button
          type="primary"
          @click="submitComment"
          :loading="isSubmitting"
          :disabled="!commentContent.trim() && images.length === 0"
        >
          发布评论
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-textarea__inner) {
  background-color: #f9f9f9;
  border-color: #e0e0e0;

  .dark & {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
}

.hidden {
  display: none;
}
</style>
