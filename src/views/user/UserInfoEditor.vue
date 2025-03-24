<script setup lang="ts">
import { reactive, ref } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import type { User } from '@/types/user.ts'
import type { ElForm, FormRules } from 'element-plus'
import { editProfile } from '@/service/user.ts'
import { notification } from '@/utils/notification.ts'
import { defaultBanner } from '@/consts/default.ts'

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})

const userInfoForm = ref({
  username: props.user.username,
  aboutMe: props.user.aboutMe,
  banner: props.user.banner,
  avatar: props.user.avatar,
  links: props.user.links,
})

const userInfoFormRef = ref<InstanceType<typeof ElForm>>()
const handleSave = () => {
  userInfoFormRef.value?.validate(async (valid) => {
    if (valid) {
      await editProfile(userInfoForm.value)
      notification({
        message: '保存成功',
      })
      location.reload()
    }
  })
}

const rules = reactive<FormRules>({
  username: {
    required: true,
    message: '昵称不能为空',
    trigger: 'blur',
  },
})
</script>

<template>
  <div class="relative">
    <div class="relative">
      <el-image fit="cover" class="w-full h-40" :src="user.banner ?? defaultBanner"></el-image>
      <div
        title="切换照片"
        class="cursor-pointer absolute w-full h-40 left-0 top-0 flex justify-center items-center bg-black/20"
      >
        <span class="material-symbols-outlined"> add_a_photo </span>
      </div>
    </div>
    <div class="absolute left-4 top-30">
      <UserAvatar class="edit-avatar" :src="user.avatar" :size="80" :border="true"></UserAvatar>
    </div>
    <div class="mt-12 mb-4">
      <el-form :model="userInfoForm" label-position="top" :rules="rules" ref="userInfoFormRef">
        <el-form-item label="昵称" prop="username">
          <el-input size="large" v-model="userInfoForm.username"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="aboutMe">
          <el-input
            size="large"
            type="textarea"
            maxlength="160"
            show-word-limit
            v-model="userInfoForm.aboutMe"
            rows="3"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="链接" prop="links">
          <el-input-tag
            size="large"
            v-model="userInfoForm.links"
            draggable
            placeholder="输入后按回车添加"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="mb-2 flex justify-end">
      <el-button class="w-24" round size="large" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.edit-avatar {
  &:hover {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;

      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    }
  }
}
</style>
