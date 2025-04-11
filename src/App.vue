<template>
  <div class="app-container">
    <div class="sidebar">
      <div class="logo-container">
        <h3>ZZULI信息展示栏</h3>
      </div>
      <div class="menu-container">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          :to="item.route"
          class="menu-item"
          :class="{ active: activeMenu === item.id }"
          @click="setActiveMenu(item)"
        >
          <div class="menu-icon">{{ item.icon }}</div>
          <div class="menu-name">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
    <div class="content-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { id: 'qq', name: 'QQ群', icon: '👥', route: '/' },
  { id: 'links', name: '友情链接', icon: '🔗', route: '/friend-links' },
  { id: 'github', name: 'GitHub', icon: '🌟', route: '/github' }
])

const activeMenu = ref('qq')

const setActiveMenu = (item) => {
  activeMenu.value = item.id
}
</script>

<style>
:root {
  --ios-primary-color: #007aff;
  --ios-secondary-color: #5ac8fa;
  --ios-success-color: #34c759;
  --ios-warning-color: #ff9500;
  --ios-danger-color: #ff3b30;
  --ios-gray-color: #8e8e93;
  --ios-light-gray: #f2f2f7;
  --ios-dark-gray: #48484a;
  --ios-text-color: #000000;
  --ios-background-color: #f2f2f7;
  --ios-card-background: #ffffff;
  --ios-border-radius: 12px;
  --ios-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --sidebar-width: 240px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--ios-background-color);
  color: var(--ios-text-color);
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background-color: var(--ios-card-background);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  box-shadow: var(--ios-shadow);
  z-index: 100;
}

.logo-container {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.logo-container h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--ios-text-color);
}

.menu-container {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--ios-text-color);
  transition: all 0.2s ease;
  border-radius: 0;
  margin-bottom: 5px;
}

.menu-item:hover {
  background-color: rgba(0, 122, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(0, 122, 255, 0.15);
  color: var(--ios-primary-color);
  font-weight: 500;
}

.menu-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.menu-name {
  font-size: 16px;
}

.content-container {
  flex: 1;
  padding: 20px;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
}

/* iOS-style card */
.ios-card {
  background-color: var(--ios-card-background);
  border-radius: var(--ios-border-radius);
  box-shadow: var(--ios-shadow);
  padding: 16px;
  transition: all 0.3s ease;
}

.ios-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Section titles */
.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 25px;
  color: var(--ios-text-color);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .menu-name {
    display: none;
  }

  .logo-container h3 {
    font-size: 0;
  }

  .logo-container::after {
    content: "📱";
    font-size: 24px;
  }

  .content-container {
    margin-left: 70px;
  }
}
</style>
