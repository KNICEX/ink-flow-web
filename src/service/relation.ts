import { get } from './axios.ts'
import type { User } from '@/types/user.ts'
interface MaxIdPagedReq {
  maxId?: number
  limit: number
}
export const following = async (uid: number, page: MaxIdPagedReq) => {
  return await get<User[]>(`/user/${uid}/following`, {
    params: page,
  })
}

export const follower = async (uid: number, page: MaxIdPagedReq) => {
  return await get<User[]>(`/user/${uid}/follower`, {
    params: page,
  })
}
