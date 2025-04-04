import { del, get, post } from '@/service/axios.ts'
import type { Ink } from '@/types/ink.ts'
import { useUserStore } from '@/stores/user.ts'
import { emptyUser } from '@/types/user.ts'

interface SaveDraftReq {
  id?: number
  title?: string
  cover?: string
  summary?: string
  category?: number
  contentHtml: string
  contentMeta: string
  tags?: string[]
}

interface SaveDraftResp {
  id: number
}

export const detail = async (id: number) => {
  return await get<Ink>(`/ink/detail/${id}`)
}

interface ListReq {
  authorId: number
  category?: number
  offset: number
  limit: number
}

interface MaxIdPagedReq {
  maxId: number
  limit: number
}

interface ListSelfReq {
  category?: number
  offset: number
  limit: number
}

export const list = async (req: ListReq) => {
  return await post<Ink[], ListReq>('/ink/list', req)
}

export const saveDraft = async (req: SaveDraftReq) => {
  return await post<SaveDraftResp, SaveDraftReq>('/ink/draft/save', req)
}

export const publish = async (id: number) => {
  return await post(`/ink/draft/publish/${id}`, {})
}

export const detailForEdit = async (id: number) => {
  const ink = await get<Ink>(`/ink/detail/${id}`)
  const userStore = useUserStore()
  ink.author = userStore.getActiveUser()?.user ?? emptyUser()
  return ink
}

export const draftDetail = async (id: number) => {
  const draft = await get<Ink>(`/ink/draft/${id}`)
  const userStore = useUserStore()
  draft.author = userStore.getActiveUser()?.user ?? emptyUser()
  return draft
}

export const privateDetail = async (id: number) => {
  const priInk = await get<Ink>(`/ink/private/${id}`)
  const userStore = useUserStore()
  priInk.author = userStore.getActiveUser()?.user ?? emptyUser()
  return priInk
}

export const rejectedDetail = async (id: number) => {
  const rejected = await get<Ink>(`/ink/rejected/${id}`)
  const userStore = useUserStore()
  rejected.author = userStore.getActiveUser()?.user ?? emptyUser()
  return rejected
}

export const listDraft = async (req: ListSelfReq) => {
  const res = await get<Ink[]>(`/ink/draft`, {
    params: req,
  })
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const listPrivate = async (req: ListSelfReq) => {
  const res = await get<Ink[]>('/ink/private', {
    params: req,
  })
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const listPending = async (req: ListSelfReq) => {
  const res = await get<Ink[]>('/ink/pending', {
    params: req,
  })
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const listViewed = async (req: MaxIdPagedReq) => {
  return await get<Ink[]>('/ink/viewed', {
    params: req,
  })
}

export const listLiked = async (req: MaxIdPagedReq) => {
  return await get<Ink[]>('/ink/liked', {
    params: req,
  })
}

export const listRejected = async (req: ListSelfReq) => {
  const res = await get<Ink[]>('/ink/rejected', {
    params: req,
  })
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

interface ListFavoritedReq {
  fid: number
  maxId?: number
  limit: number
}

export const listFavorited = async (req: ListFavoritedReq) => {
  return await get<Ink[]>('/ink/favorited', {
    params: req,
  })
}
export const deleteDraft = async (id: number) => {
  return await del(`/ink/draft/${id}`, {})
}

export const deletePrivate = async (id: number) => {
  return await del(`/ink/private/${id}`, {})
}
export const deleteLive = async (id: number) => {
  return await del(`/ink/live/${id}`, {})
}

export const like = async (id: number) => {
  return await post(`/ink/like/${id}`, {})
}

export const cancelLike = async (id: number) => {
  return await del(`/ink/like/${id}`)
}

export const favorite = async (id: number, favoriteId?: number) => {
  return await post(`/ink/favorite/${id}`, {
    favoriteId: favoriteId ?? 0,
  })
}

export const cancelFavorite = async (id: number) => {
  return await del(`/ink/favorite/${id}`)
}
