import { inject, provide, type Ref } from 'vue'
import type { Ink } from '@/types/ink.ts'
import { cancelLike, favorite, like } from '@/service/ink.ts'
import { notification } from '@/utils/notification.ts'

export const useProvideInkInteractiveHandler = (inks: Ref<Ink[]>) => {
  const handleLike = async (id: number) => {
    await like(id)
    for (let i = 0; i < inks.value.length; i++) {
      if (inks.value[i].id == id) {
        inks.value[i].interactive.liked = true
        inks.value[i].interactive.likeCnt++
        break
      }
    }
  }
  const handleCancelLike = async (id: number) => {
    await cancelLike(id)
    for (let i = 0; i < inks.value.length; i++) {
      if (inks.value[i].id == id) {
        inks.value[i].interactive.liked = false
        inks.value[i].interactive.likeCnt--
        break
      }
    }
  }

  const handleFavorite = async (id: number) => {
    //TODO弹出收藏夹选项
    await favorite(id, 0)
    for (let i = 0; i < inks.value.length; i++) {
      if (inks.value[i].id == id) {
        inks.value[i].interactive.favorited = true
        inks.value[i].interactive.favoriteCnt++
        break
      }
    }
    notification({
      message: '收藏成功',
    })
  }
  const handleCancelFavorite = async (id: number) => {
    await favorite(id, 1)
    for (let i = 0; i < inks.value.length; i++) {
      if (inks.value[i].id == id) {
        inks.value[i].interactive.favorited = false
        inks.value[i].interactive.favoriteCnt--
        break
      }
    }
    notification({
      message: '取消收藏成功',
    })
  }

  provide('handleLike', handleLike)
  provide('handleCancelLike', handleCancelLike)
  provide('handleFavorite', handleFavorite)
  provide('handleCancelFavorite', handleCancelFavorite)
}

export const useInjectInkInteractiveHandler = () => {
  const doNothing = () => {}
  const handleLike = inject<(id: number) => void>('handleLike') ?? doNothing
  const handleCancelLike = inject<(id: number) => void>('handleCancelLike') ?? doNothing
  const handleFavorite = inject<(id: number) => void>('handleFavorite') ?? doNothing
  const handleCancelFavorite = inject<(id: number) => void>('handleCancelFavorite') ?? doNothing
  return {
    handleLike,
    handleCancelLike,
    handleFavorite,
    handleCancelFavorite,
  }
}
