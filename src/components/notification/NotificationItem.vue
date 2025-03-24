<script setup lang="ts">
import InkPopover from '@/components/popover/InkPopover.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import UserCard from '@/components/UserCard.vue'
import type { User } from '@/types/user.ts'
import MoreOpration from '@/components/button/MoreOpration.vue'

defineProps({
  users: {
    type: Array as () => User[],
    required: true,
  },
})
</script>

<template>
  <div class="flex max-w-240 hover:bg-gray-100 p-4 rounded-xl transition-colors cursor-pointer">
    <div v-if="users.length == 1" class="w-20">
      <InkPopover :show-after="400">
        <template #reference>
          <UserAvatar :hover-mask="true" :src="users[0].avatar"></UserAvatar>
        </template>
        <template #content>
          <UserCard :user="users[0]"></UserCard>
        </template>
      </InkPopover>
    </div>
    <div v-else class="relative w-20">
      <InkPopover :show-after="400">
        <template #reference>
          <UserAvatar :hover-mask="true" :size="40" :src="users[0].avatar"></UserAvatar>
        </template>
        <template #content>
          <UserCard :user="users[0]"></UserCard>
        </template>
      </InkPopover>
      <InkPopover :show-after="400">
        <template #reference>
          <UserAvatar
            :hover-mask="true"
            :size="40"
            :src="users[1].avatar"
            class="absolute left-4 top-4"
            border
          ></UserAvatar>
        </template>
        <template #content>
          <UserCard :user="users[1]"></UserCard>
        </template>
      </InkPopover>
    </div>
    <div class="w-full">
      <div class="flex justify-between">
        <div>
          <div class="flex">
            <div v-if="users.length == 1">
              <span>
                <router-link to="/user/chtholly">
                  <span>{{ users[0].username }}</span>
                  <el-link class="nav-text ml-2">@{{ users[0].account }}</el-link>
                </router-link>
              </span>
              <span class="ml-4">
                <slot name="title"></slot>
              </span>
            </div>
            <div v-else>
              <span>
                <router-link to="/user/chtholly">
                  <span>{{ users[0].username }}</span>
                </router-link>
                <span>、</span>
                <router-link to="/user/chtholly">
                  <span>{{ users[1].username }}</span>
                </router-link>
              </span>
              <span class="ml-4">
                <slot name="title"></slot>
              </span>
            </div>
          </div>
          <div class="text-sm text-gray-500 mt-1">2025年3月1日 21:33</div>
        </div>
        <InkPopover padding="0" trigger="click">
          <template #reference>
            <MoreOpration :horizon="true"></MoreOpration>
          </template>
          <template #content>
            <div class="transition-colors transition-300">
              <div class="popover-button">回复</div>
              <div class="popover-button">删除</div>
            </div>
          </template>
        </InkPopover>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
