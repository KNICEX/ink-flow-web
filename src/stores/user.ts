import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { User } from '@/types/user.ts'

// 支持多账户登录
interface LoginUser {
  user: User
  refreshToken: string
  token: string
}

interface UserState {
  users: LoginUser[]
  activeUser: LoginUser | null
}

export const useUserStore = defineStore('user', () => {
  const userState = ref<UserState>({
    users: [],
    activeUser: null,
  })

  // 持久化
  function saveInLocalStorage() {
    localStorage.setItem('userState', JSON.stringify(userState.value))
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('userState')
    if (saved) {
      userState.value = JSON.parse(saved)
    }
  }

  function getActiveUser(): LoginUser | null {
    return userState.value.activeUser
  }

  // 设置登录账户信息(包括当前的token)
  function setActiveUser(user: LoginUser | null): void {
    userState.value.activeUser = user
    saveInLocalStorage()
  }

  // 更新登录账户的账号信息
  function updateActiveUserInfo(user: User): void {
    if (userState.value.activeUser) {
      userState.value.activeUser.user = user
      saveInLocalStorage()
    }
  }

  function addUser(user: LoginUser): void {
    const index = userState.value.users.findIndex((u) => u.user.id === user.user.id)
    if (index === -1) {
      userState.value.users.push(user)
    } else {
      userState.value.users[index] = user
    }
    saveInLocalStorage()
  }

  // 请勿传入activeUser的id,可能导致错误
  function removeUser(uid: number): void {
    const index = userState.value.users.findIndex((user) => user.user.id === uid)
    if (index !== -1) {
      userState.value.users.splice(index, 1)
      saveInLocalStorage()
    }
  }

  function getUserList(): LoginUser[] {
    return userState.value.users
  }

  function logout() {
    userState.value.activeUser = null
    saveInLocalStorage()
  }

  return {
    getActiveUser,
    setActiveUser,
    logout,
    updateActiveUser: updateActiveUserInfo,
    addUser,
    getUserList,
    removeUser,
    loadFromLocalStorage,
    saveInLocalStorage,
  }
})

interface RegisterToken {
  token: string
  email: string
}

export const useRegisterTokenStore = defineStore('registerToken', () => {
  const emailToken = reactive<RegisterToken>({
    email: '',
    token: '',
  })

  function setEmailToken(email: string, token: string) {
    emailToken.email = email
    emailToken.token = token
    setTimeout(() => {
      // 10分钟后清空
      if (emailToken.email === email && emailToken.token === token) {
        emailToken.email = ''
        emailToken.token = ''
      }
    }, 600000)
  }

  function getEmailToken(): RegisterToken {
    return emailToken
  }

  return { setEmailToken, getEmailToken, emailToken }
})
