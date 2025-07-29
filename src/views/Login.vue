<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

//hooks 一般都是存放什么的

class LoginForm {
    username: string = ''
    password: string = ''
}

const loginForm = ref(new LoginForm())

const login = async () => {
    try {
        if(loginForm.value.username=="admin"&&loginForm.value.password=="123456"){
          //登录成功
            router.push('/');
        }else{
            console.log('登录失败');
        }
        
    } catch (error) {
        console.error('Login failed:', error);
    }
}

</script>

<template>
    <div>
        <h1>登录</h1>
        <form @submit.prevent="login">
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="loginForm.username" required>

            <label for="password">密码:</label>
            <input type="password" id="password" v-model="loginForm.password" required>

            <button type="submit">登录</button>
        </form>
    </div>
    
</template>