<script setup lang="ts">
import { computed, inject } from 'vue'
import clsx from 'clsx'

const props = defineProps({
  prop: {
    type: String,
    default: '',
  },
  sub: {
    type: Boolean,
    default: false,
  },

  selectable: {
    type: Boolean,
    default: true,
  },
})
const { activeItem, updateActiveItem } = inject('active-item')
const active = computed(() => {
  return activeItem.value === props.prop
})
const navClass = computed(() => {
  return clsx({
    'h-13 flex items-center nav-text w-full rounded-xl mt-1 transition duration-200': true,
    ' px-4 cursor-default': !props.sub,
    'rounded-xl  pl-10   ': props.sub,
    ' cursor-pointer': props.selectable,
    'hover:bg-slate-200': props.selectable && !active.value,
    'bg-white shadow-sm nav-text-color': active.value,
  })
})

const handleClick = () => {
  if (props.selectable) {
    console.log('updateActiveItem', props.prop)
    updateActiveItem(props.prop)
  }
}
</script>
<template>
  <div :class="navClass" @click="handleClick">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.nav-text-color {
  color: var(--primary-color);
}
</style>
