<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="login-bg">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>

    <!-- 登录卡片 -->
    <div class="login-card">
      <!-- 顶部logo区域 -->
      <div class="login-header">
        <div class="logo">
          <el-icon size="40" color="#409EFF">
            <UserFilled />
          </el-icon>
          <h1>欢迎登录</h1>
        </div>
        <p class="welcome-text">请输入您的账号和密码</p>
      </div>

      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form"
        @submit.prevent="handleLogin">
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名/邮箱/手机号" size="large" :prefix-icon="User"
            @keyup.enter="handleLogin" />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" :prefix-icon="Lock"
            show-password @keyup.enter="handleLogin" />
        </el-form-item>

        <!-- 记住我和忘记密码 -->
        <div class="login-options">
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          <el-link type="primary" :underline="false" @click="handleForgotPassword">
            忘记密码?
          </el-link>
        </div>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" size="large" class="login-button" :loading="loading" @click="handleLogin">
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>

        <!-- 其他登录方式 -->
        <div class="other-login">
          <div class="divider">
            <span>其他登录方式</span>
          </div>
          <div class="login-methods">
            <el-button circle class="login-method-btn" @click="handleSocialLogin('wechat')">
              <el-icon size="20">
                <ChatRound />
              </el-icon>
            </el-button>
            <el-button circle class="login-method-btn" @click="handleSocialLogin('github')">
              <el-icon size="20">
                <ChatDotRound />
              </el-icon>
            </el-button>
            <el-button circle class="login-method-btn" @click="handleSocialLogin('qq')">
              <el-icon size="20">
                <ChatLineRound />
              </el-icon>
            </el-button>
          </div>
        </div>

        <!-- 注册提示 -->
        <div class="register-tip">
          还没有账号?
          <el-link type="primary" :underline="false" @click="handleRegister">
            立即注册
          </el-link>
        </div>
      </el-form>
    </div>

    <!-- 忘记密码对话框 -->
    <el-dialog v-model="forgotPasswordVisible" title="找回密码" width="400px" center>
      <el-form :model="forgotForm" :rules="forgotRules" ref="forgotFormRef">
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="forgotForm.email" placeholder="请输入注册邮箱" :prefix-icon="Message" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="forgotPasswordVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSendResetEmail">发送重置邮件</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock, Message, UserFilled, ChatRound, ChatDotRound, ChatLineRound } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import login from '../api/userinfoService'
import { setToken } from '../utils/tokenHelper'
const router = useRouter()

// 登录表单数据
interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
}

const loginForm = reactive < LoginForm > ({
  username: '',
  password: '',
  rememberMe: false
})

// 忘记密码表单数据
interface ForgotForm {
  email: string
}

const forgotForm = reactive < ForgotForm > ({
  email: ''
})

// 表单引用
const loginFormRef = ref < FormInstance > ()
const forgotFormRef = ref < FormInstance > ()

// 状态控制
const loading = ref(false)
const forgotPasswordVisible = ref(false)

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' }
  ]
}

const forgotRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

// 登录处理
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    // 表单验证
    const valid = await loginFormRef.value.validate()
    if (!valid) return

    loading.value = true

    login.login(loginForm.username, loginForm.password).then(response => {

      // TODO: 登录成功后，将token保存到本地，并跳转到首页
      if (response.code === 200) {
        setToken(response.data)
        if (loginForm.rememberMe) {
          sessionStorage.setItem('token', response.data)
        }
        router.push('/home')
      } else {
        ElMessage.error('登录失败，请重试,失败原因：' + response.message);
      }
    }).catch(error => {
      ElMessage.error('登录出错，请重试');
      console.error('登录出错原因:', error);
    })


  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请重试')
  } finally {
    loading.value = false
  }
}

// 忘记密码处理
const handleForgotPassword = () => {
  forgotPasswordVisible.value = true
}

// 发送重置邮件
const handleSendResetEmail = async () => {
  if (!forgotFormRef.value) return

  try {
    const valid = await forgotFormRef.value.validate()
    if (!valid) return

    // 模拟发送邮件
    await new Promise(resolve => setTimeout(resolve, 1000))

    ElMessage.success(`重置链接已发送至 ${forgotForm.email}`)
    forgotPasswordVisible.value = false
    forgotForm.email = ''
  } catch (error) {
    ElMessage.error('发送失败，请重试');
    console.error('发送失败原因:', error);
  }
}

// 社交登录
const handleSocialLogin = (type: string) => {
  ElMessage.info(`正在跳转到${type}登录...`)
  // 这里可以添加实际的社交登录逻辑
}

// 注册跳转
const handleRegister = () => {
  ElMessage.info('跳转到注册页面')
  // router.push('/register')
}

// 组件挂载时检查本地存储的登录信息
onMounted(() => {
  const savedUsername = localStorage.getItem('username')
  const savedPassword = localStorage.getItem('password')

  if (savedUsername && savedPassword) {
    loginForm.username = savedUsername
    loginForm.password = savedPassword
    loginForm.rememberMe = true
  }
})
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 10%;
}

.login-card {
  width: 400px;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1;
  position: relative;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.logo h1 {
  margin: 0;
  color: #303133;
  font-size: 24px;
  font-weight: 600;
}

.welcome-text {
  color: #909399;
  font-size: 14px;
  margin: 0;
}

.login-form {
  margin-top: 20px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
}

.other-login {
  margin: 25px 0;
}

.divider {
  position: relative;
  text-align: center;
  margin: 20px 0;
  color: #909399;
  font-size: 14px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #dcdfe6;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 15px;
  position: relative;
  z-index: 2;
}

.login-methods {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.login-method-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #dcdfe6;
  background: white;
}

.login-method-btn:hover {
  border-color: #409EFF;
  color: #409EFF;
}

.register-tip {
  text-align: center;
  font-size: 14px;
  color: #606266;
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    width: 90%;
    margin: 20px;
    padding: 30px 20px;
  }
}

/* 动画效果 */
.login-card {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
