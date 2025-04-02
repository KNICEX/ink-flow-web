import type { User } from '@/types/user.ts'
import { get } from './axios.ts'

export const recommendAuthor = async (offset: number, limit: number) => {
  return await get<User[]>('/recommend/user', {
    params: {
      offset,
      limit,
    },
  })
}

export const similarInks = async (offset: number, limit: number) => {
  return await get<User[]>('/recommend/ink', {
    params: {
      offset,
      limit,
    },
  })
}

export const similarAuthors = async (offset: number, limit: number) => {
  return await get<User[]>('/recommend/user', {
    params: {
      offset,
      limit,
    },
  })
}
