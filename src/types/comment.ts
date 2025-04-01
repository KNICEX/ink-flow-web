import type { User } from '@/types/user.ts'

export interface Comment {
  id: number
  biz: string
  bizId: number
  commentator: User
  payload: CommentPayload
  parent: Comment | null
  root: Comment | null
  children: Comment[] | null

  liked: boolean
  likeCnt: number
  viewCnt: number
  createdAt: Date
}

export interface CommentPayload {
  content: string
  images: string[]
}

export const emptyComment = (): Comment => {
  return {
    id: 0,
    biz: '',
    bizId: 0,
    commentator: {
      id: 0,
      avatar: '',
      banner: '',
      username: '',
      account: '',
      aboutMe: '',
      email: '',
      phone: '',
      links: [],
      followed: false,
      followers: 0,
      following: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    payload: {
      content: '',
      images: [],
    },
    parent: null,
    root: null,
    children: [],
    liked: false,
    likeCnt: 0,
    viewCnt: 0,
    createdAt: new Date(),
  }
}
