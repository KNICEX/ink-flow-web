import { get, post } from '@/service/axios.ts'
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

export const draftDetail = async (id: number) => {
  const draft = await get<Ink>(`/ink/draft/detail/${id}`)
  const userStore = useUserStore()
  draft.author = userStore.getActiveUser()?.user ?? emptyUser()
  return draft
}

export const privateDetail = async (id: number) => {
  const priInk = await get<Ink>(`/ink/private/detail/${id}`)
  const userStore = useUserStore()
  priInk.author = userStore.getActiveUser()?.user ?? emptyUser()
  return priInk
}

export const rejectedDetail = async (id: number) => {
  const rejected = await get<Ink>(`/ink/rejected/detail/${id}`)
  const userStore = useUserStore()
  rejected.author = userStore.getActiveUser()?.user ?? emptyUser()
  return rejected
}

export const listDraft = async (req: ListSelfReq) => {
  const res = await post<Ink[], ListSelfReq>(`/ink/draft/list`, req)
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const listPrivate = async (req: ListSelfReq) => {
  const res = await post<Ink[], ListSelfReq>('/ink/private/list', req)
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const listPending = async (req: ListSelfReq) => {
  const res = await post<Ink[], ListSelfReq>('/ink/pending/list', req)
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const listRejected = async (req: ListSelfReq) => {
  const res = await post<Ink[], ListSelfReq>('/ink/rejected/list', req)
  const userStore = useUserStore()
  const user = userStore.getActiveUser()?.user ?? emptyUser()
  for (const ink of res) {
    ink.author = user
  }
  return res
}

export const deleteDraft = async (id: number) => {
  return await post(`/ink/draft/delete/${id}`, {})
}

export const deletePrivate = async (id: number) => {
  return await post(`/ink/private/delete/${id}`, {})
}
export const deleteLive = async (id: number) => {
  return await post(`/ink/live/delete/${id}`, {})
}
