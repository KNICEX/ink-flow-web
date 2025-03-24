<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import InkPopover from '@/components/popover/InkPopover.vue'
import { ElInput } from 'element-plus'
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search what you want',
  },
  value: {
    type: String,
    default: '',
  },
})
const router = useRouter()

const keywords = ref(props.value)
const marshaledKeywords = computed(() => {
  // 空格分隔替换为加号
  return keywords.value.replace(/\s+/g, '+')
})
const handleSearch = () => {
  router.push({
    name: 'search',
    query: {
      key: marshaledKeywords.value,
    },
  })
}

const inputRef = useTemplateRef<InstanceType<typeof ElInput>>('inputRef')
const popWidth = ref('auto')
onMounted(() => {
  popWidth.value = `${inputRef.value?.$el.offsetWidth}px`
})

const setValue = (value: string) => {
  keywords.value = value
}
defineExpose({
  setValue,
})
</script>

<template>
  <InkPopover trigger="click" padding="0" :width="popWidth">
    <template #reference>
      <el-input
        ref="inputRef"
        v-model="keywords"
        size="large"
        clearable
        class="hover:shadow-sm rounded-input h-12"
        :placeholder="placeholder"
        :prefix-icon="Search"
        :style="{ borderRadius: '2rem' }"
        @keyup.enter="handleSearch"
      />
    </template>
    <template #content>
      <div>
        <div class="px-10 h-12 flex items-center justify-between">
          <span class="lg-semibold-text">历史记录</span>
          <span class="cursor-pointer text-[var(--primary-color)]">清除全部</span>
        </div>
        <div>
          <div class="popover-button">
            <span>Eth</span>
            <span></span>
          </div>
          <div class="popover-button">Bitcoin</div>
          <div class="popover-button">Lalalalallalalal</div>
        </div>
      </div>
    </template>
  </InkPopover>
</template>

<style scoped lang="scss"></style>
