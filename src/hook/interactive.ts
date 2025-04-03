import { inject, provide, type Ref } from 'vue'
import type { Ink } from '@/types/ink.ts'
import { cancelLike, favorite, like } from '@/service/ink.ts'
import { notification } from '@/utils/notification.ts'

interface InteractiveHandler {
  handleLike: (id: number) => Promise<void>
  handleCancelLike: (id: number) => Promise<void>
  handleFavorite: (id: number) => Promise<void>
  handleCancelFavorite: (id: number) => Promise<void>
}
export const useProvideInkInteractiveHandler = (inks: Ref<Ink[]>) => {
  const handleLike = async (id: number) => {
    await like(id)
    const i = inks.value.find((v) => v.id == id)
    if (i) {
      i.interactive.liked = true
      i.interactive.likeCnt++
    }
  }
  const handleCancelLike = async (id: number) => {
    await cancelLike(id)
    const i = inks.value.find((v) => v.id == id)
    if (i) {
      i.interactive.liked = false
      i.interactive.likeCnt--
    }
  }

  const handleFavorite = async (id: number) => {
    //TODO弹出收藏夹选项
    await favorite(id, 0)
    const i = inks.value.find((v) => v.id == id)
    if (i) {
      i.interactive.favorited = true
      i.interactive.favoriteCnt++
    }
    notification({
      message: '收藏成功',
    })
  }
  const handleCancelFavorite = async (id: number) => {
    await favorite(id, 1)
    const i = ink.value.find((v) => v.id == id)
    if (i) {
      i.interactive.favorited = false
      i.interactive.favoriteCnt--
    }
    notification({
      message: '取消收藏成功',
    })
  }

  provide('handleInteractive', {
    handleLike,
    handleCancelLike,
    handleFavorite,
    handleCancelFavorite,
  })
}

export const useInjectInkInteractiveHandler = () => {
  const { handleLike, handleCancelLike, handleFavorite, handleCancelFavorite } =
    inject<InteractiveHandler>('handleInteractive') ?? {
      handleLike: async () => {},
      handleCancelLike: async () => {},
      handleFavorite: async () => {},
      handleCancelFavorite: async () => {},
    }

  return {
    handleLike,
    handleCancelLike,
    handleFavorite,
    handleCancelFavorite,
  }
}
