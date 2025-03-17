import { post, get } from './axios'
import type { User } from '@/types/user.ts'
import { useUserStore } from '@/stores/user.ts'

interface AccountPwdLoginReq {
  account: string
  password: string
}

interface EmailPwdLoginReq {
  email: string
  password: string
}

interface EmailRegisterReq {
  email: string
  account: string
  username: string
  password: string
  token: string
}

interface EmailCodeLoginReq {
  email: string
  code: string
}

interface ProfileReq {
  uid?: number
  account?: string
}

interface RefreshTokenReq {
  refreshToken: string
}

export const logout = async () => {
  return await get<never>('/user/logout')
}

export const loginEmailPwd = async (req: EmailPwdLoginReq) => {
  return await post<never, EmailPwdLoginReq>('/user/login/pwd/email', req)
}

export const sendLoginCode = async (email: string) => {
  return await post<never, { email: string }>('/user/verify/send/login', { email })
}

// 返回对应email 10分钟内的凭证
export const loginEmailCode = async (req: EmailCodeLoginReq) => {
  return await post<string, EmailCodeLoginReq>('/user/login/email', req)
}

export const registerByEmail = async (req: EmailRegisterReq) => {
  // todo 这里注册成功直接返回的token在header, 后面可能要直接把用户信息拿到？
  return await post<string, EmailRegisterReq>('/user/register/email', req)
}

export const profile = async (req?: ProfileReq) => {
  return await post<User, ProfileReq>('/user/profile', req ?? {})
}

export const refreshToken = async () => {
  const userStore = useUserStore()
  const activeUser = userStore.getActiveUser()
  if (!activeUser) {
    return
  }
  const req: RefreshTokenReq = {
    refreshToken: activeUser.refreshToken,
  }
  return await post<never, RefreshTokenReq>('/user/refresh_token', req)
}
