import { provide, inject } from 'vue'
import type { Ref } from 'vue'
import type { User } from '@/types/user.ts'
import { cancelFollow, follow } from '@/service/user.ts'
import { notification } from '@/utils/notification.ts'

export const useProvideFollowHandler = (users: Ref<User[]>) => {
  const handleFollow = async (uid: number) => {
    console.log('handleFollow', uid)
    await follow(uid)
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id === uid) {
        users.value[i].followed = true
        users.value[i].followers++
        break
      }
    }
    notification({
      message: '关注成功',
    })
  }
  const handleCancelFollow = async (uid: number) => {
    await cancelFollow(uid)
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id === uid) {
        users.value[i].followed = false
        users.value[i].followers--
        break
      }
    }
    notification({
      message: '取消关注成功',
    })
  }
  provide('handleFollow', handleFollow)
  provide('handleCancelFollow', handleCancelFollow)
}

export const useInjectFollowHandler = () => {
  const doNothing = () => {}
  const handleFollow = inject<(uid: number) => void>('handleFollow') ?? doNothing
  const handleCancelFollow = inject<(uid: number) => void>('handleCancelFollow') ?? doNothing
  return {
    handleFollow,
    handleCancelFollow,
  }
}
