<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { authService } from '@/api/auth'
import { useUserinfoStore } from '@/stores/userinfo'
//hooks 一般都是存放什么的

const userinfoStore = useUserinfoStore()

class LoginForm {
  username: string = ''
  password: string = ''
}

const loginForm = ref(new LoginForm())
const isLogin = ref(false)

const login = async () => {
  try {
    const response = await authService.login(loginForm.value)
    console.log('登录成功', response)
    if (response.success) {
      // 登录成功，将 token 存储在 localStorage 中
      localStorage.setItem('token', response.data.token)
      const userData = response.data.sysUser
      userinfoStore.setUserInfo({
        sex: userData.sex,
        userID: userData.userID,
        nickName: userData.nickName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        avatar: userData.avatar,
      })
      isLogin.value = userinfoStore.isLogin
      //登录成功
      router.push('/')
    } else {
      console.log('登录失败')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const logout = () => {
  // 清除 localStorage 中的 token
  localStorage.removeItem('token')
  // 清除用户信息
  userinfoStore.setUserInfo({
    sex: '',
    userID: 0,
    nickName: '',
    phoneNumber: '',
    email: '',
    avatar: '',
  })
  // 跳转到登录页面
  router.push('/')
}
</script>

<template>
  <div>
    <div v-if="userinfoStore.isLogin">
      <h1>登录成功</h1>
      <p>欢迎，{{ userinfoStore.userInfo?.nickName || '用户' }}</p>
      <button @click="logout">退出登录</button>
    </div>
    <div v-else>
      <h1>登录</h1>
      <form @submit.prevent="login">
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="loginForm.username" required />

        <label for="password">密码:</label>
        <input type="password" id="password" v-model="loginForm.password" required />

        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>
