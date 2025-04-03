import { del, get, post } from './axios.ts'
import type { CommentPayload, Comment } from '@/types/comment.ts'
export interface CommentReq {
  biz: string
  bizId: number
  maxId?: number
  limit: number
}

export interface MaxIdPagedReq {
  maxId?: number
  limit: number
}

export interface ReplyReq {
  biz: string
  bizId: number
  rootId?: number
  parentId?: number
  payload: CommentPayload
}

export const loadComment = async (req: CommentReq) => {
  return await get<Comment[]>('/comment', {
    params: req,
  })
}

export const loadChild = async (rid: number, req: MaxIdPagedReq) => {
  return await get<Comment[]>('/comment/child', {
    params: {
      rid,
      ...req,
    },
  })
}

export const reply = async (req: ReplyReq) => {
  return await post<number, ReplyReq>('/comment/reply', req)
}

export const likeComment = async (cid: number) => {
  return await post<Comment[], null>(`/comment/like/${cid}`, null)
}

export const cancelLikeComment = async (cid: number) => {
  return await del<never>(`/comment/like/${cid}`)
}

export const deleteComment = async (cid: number) => {
  return await del<Comment[]>(`/comment/${cid}`)
}
