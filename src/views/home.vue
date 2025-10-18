<template>
  <div class="main-layout">
    <aside class="sidebar">
      <div class="logo">数据后台管理系统</div>
      <nav class="menu">
        <ul>
          <li><router-link to="user">用户信息</router-link></li>
          <li><router-link to="dashboard">数据大屏</router-link></li>
          <li><router-link to="about">关于</router-link></li>

        </ul>
      </nav>
    </aside>
    <div class="main-content">
      <header class="header">
        <span>数据后台管理系统</span>
        <!-- 可添加用户信息、退出按钮等 -->
      </header>
      <section class="content-area">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可根据需要引入 store、router 等
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background: #2d3a4b;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  padding: 24px 0;
  text-align: center;
  background: #223047;
}

.menu {
  flex: 1;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 16px 24px;
}

.menu li a {
  color: #fff;
  text-decoration: none;
}

.menu li a.router-link-active {
  font-weight: bold;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  height: 56px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 18px;
  font-weight: 500;
}

.content-area {
  flex: 1;
  background: #f5f6fa;
  padding: 24px;
  overflow: auto;
}
</style>
