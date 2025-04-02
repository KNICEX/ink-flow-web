import { get, post } from './axios.ts'
import type { CommentPayload } from '@/types/comment.ts'
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
  Biz: string
  BizId: number
  RootId?: number
  ParentId?: number
  Payload: CommentPayload
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
  return await post<Comment[], ReplyReq>('/comment/reply', req)
}
