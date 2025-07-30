import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '../models/BaseResponse'

export const useUserinfoStore = defineStore('userinfo', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLogin = computed(() => !!userInfo.value?.userID)

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }

  // 初始化时从localStorage加载用户信息
  const initUserInfo = () => {
    const savedInfo = localStorage.getItem('userInfo')
    if (savedInfo) {
      userInfo.value = JSON.parse(savedInfo)
    }
  }

  return { userInfo, isLogin, setUserInfo, clearUserInfo, initUserInfo }
})
