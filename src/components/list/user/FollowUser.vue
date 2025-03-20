<script setup lang="ts">
import ImageInk from '@/components/list/ink/ImageInk.vue'
import { demoInks } from '@/mock/demo_data.ts'
import UserCard from '@/components/UserCard.vue'
import { ref } from 'vue'
import type { User } from '@/types/user.ts'

const inks = demoInks(4)
defineProps({
  user: {
    type: Object as () => User,
    default: () => ({}),
  },
})

// const scrollDiv = ref<HTMLElement | null>(null)
// const showRight = ref(true)
// const showLeft = ref(false)
// const moveLeft = () => {
//   console.log('move left')
//   if (scrollDiv.value) {
//     scrollDiv.value.scrollBy({
//       left: -300,
//       behavior: 'smooth',
//     })
//     // 判断left和right
//     console.log('scrollLeft', scrollDiv.value.scrollLeft)
//     if (scrollDiv.value.scrollLeft > 200 || scrollDiv.value.scrollLeft < 20) {
//       showLeft.value = false
//     }
//
//     if (scrollDiv.value.scrollLeft < 600) {
//       showRight.value = true
//     }
//   }
// }
//
// const moveRight = () => {
//   console.log('move right')
//   if (scrollDiv.value) {
//     scrollDiv.value.scrollBy({
//       left: 300,
//       behavior: 'smooth',
//     })
//     if (
//       scrollDiv.value.scrollWidth - scrollDiv.value.clientWidth - scrollDiv.value.scrollLeft >
//       0
//     ) {
//       showLeft.value = true
//     }
//
//     if (
//       scrollDiv.value.scrollWidth - scrollDiv.value.clientWidth - scrollDiv.value.scrollLeft <
//       300
//     ) {
//       showRight.value = false
//     }
//   }
// }

const listHover = ref(false)
</script>

<template>
  <div class="flex h-72 pt-2 pb-6 border-gray-200 border-b-1">
    <div class="sm:w-100 xl:w-100 pt-2">
      <UserCard :show-follow="false" :user="user"></UserCard>
    </div>
    <div
      class="overflow-x-hidden mask"
      @mouseenter="listHover = true"
      @mouseleave="listHover = false"
    >
      <!--      <Transition-->
      <!--        name="fade"-->
      <!--        enter-active-class="animate__animated animate__fadeIn"-->
      <!--        leave-active-class="animate__animated animate__fadeOut"-->
      <!--      >-->
      <!--        <div v-show="showLeft" class="button left-button z-2" @click="moveLeft">-->
      <!--          <span v-show="showLeft && listHover" class="material-symbols-outlined text-white">-->
      <!--            arrow_back_ios-->
      <!--          </span>-->
      <!--        </div>-->
      <!--      </Transition>-->
      <!--      <Transition-->
      <!--        enter-active-class="animate__animated animate__fadeIn"-->
      <!--        leave-active-class="animate__animated animate__fadeOut"-->
      <!--      >-->
      <!--        <div v-show="showRight" class="button right-button z-2" @click="moveRight">-->
      <!--          <span class="material-symbols-outlined text-white"> arrow_forward_ios </span>-->
      <!--        </div>-->
      <!--      </Transition>-->
      <div ref="scrollDiv" class="flex overflow-x-auto h-full items-center pt-4 no-scroll pr-10">
        <div class="w-50 mr-5 flex-shrink-0" v-for="ink in inks" :key="ink.id">
          <ImageInk :ink="ink" :show-author="false"></ImageInk>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  position: relative;
}

.no-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.button {
  position: absolute;
  height: 100%;
  width: 6rem;
  //background: rgba(128, 128, 128, 0.31);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #141414;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    opacity: 30%;
  }
}

.left-button {
  left: 0;
  top: 0;
  background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
  span {
    padding-left: 0.4rem;
  }
}

.right-button {
  right: 0;
  top: 0;
  background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
}
</style>
