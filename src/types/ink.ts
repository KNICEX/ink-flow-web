import { emptyUser, type User } from '@/types/user.ts'

export enum InkStatus {
  UnKnown = 0,
  UnPublished = 1,
  Pending = 2,
  Published = 3,
  Rejected = 4,
  Private = 5,
}

export const inkStatusLabel = (status: InkStatus) => {
  switch (status) {
    case InkStatus.UnPublished:
      return '未发布'
    case InkStatus.Pending:
      return '审核中'
    case InkStatus.Published:
      return '已发布'
    case InkStatus.Rejected:
      return '审核未通过'
    case InkStatus.Private:
      return '私有'
    default:
      return 'Unknown'
  }
}

export const inkStatusProp = (status: InkStatus) => {
  switch (status) {
    case InkStatus.UnPublished:
      return 'unPublished'
    case InkStatus.Pending:
      return 'pending'
    case InkStatus.Published:
      return 'published'
    case InkStatus.Rejected:
      return 'rejected'
    case InkStatus.Private:
      return 'private'
    default:
      return 'unknown'
  }
}

export const inkStatusFromProp = (prop: string) => {
  switch (prop) {
    case 'unPublished':
      return InkStatus.UnPublished
    case 'pending':
      return InkStatus.Pending
    case 'published':
      return InkStatus.Published
    case 'rejected':
      return InkStatus.Rejected
    case 'private':
      return InkStatus.Private
    default:
      return InkStatus.UnKnown
  }
}

export interface Category {
  id: number
  name: string
}

export const emptyCategory = (): Category => {
  return {
    id: 0,
    name: '',
  }
}

export interface Interactive {
  biz: string
  bizId: number
  viewCnt: number
  likeCnt: number
  commentCnt: number
  Liked: boolean
  Collected: boolean
}

export const emptyInteractive = (): Interactive => {
  return {
    biz: '',
    bizId: 0,
    viewCnt: 0,
    likeCnt: 0,
    commentCnt: 0,
    Liked: false,
    Collected: false,
  }
}

export interface Ink {
  id: number
  cover: string
  title: string
  summary: string
  category: Category
  contentType: number
  contentHtml: string
  contentMeta: string

  status: InkStatus
  tags: string[]

  author: User
  interactive: Interactive

  createdAt: Date
  updatedAt: Date
}

export const emptyInk = (): Ink => {
  return {
    id: 0,
    cover: '',
    title: '',
    summary: '',
    category: emptyCategory(),
    contentType: 0,
    contentHtml: '',
    contentMeta: '',

    status: InkStatus.UnKnown,
    tags: [],
    author: emptyUser(),
    interactive: emptyInteractive(),

    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const getStatusLabel = (status: InkStatus) => {
  switch (status) {
    case InkStatus.UnPublished:
      return 'Draft'
    case InkStatus.Pending:
      return 'Pending'
    case InkStatus.Published:
      return 'Published'
    case InkStatus.Private:
      return 'Hidden'
  }
}
