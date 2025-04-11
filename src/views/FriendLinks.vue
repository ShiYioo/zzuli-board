<template>
  <div class="friend-links-container">
    <h1 class="section-title">友情链接</h1>

    <div class="links-list">
      <a
        v-for="link in links"
        :key="link.id"
        :href="link.url"
        target="_blank"
        class="ios-card friend-link-card"
      >
        <div v-if="!link.icon.includes('http') && !link.icon.includes('src/assets')" class="link-icon">{{ link.icon }}</div>
        <img v-else :src="link.icon" :alt="link.name" class="link-icon">
        <div class="link-content">
          <h3>{{ link.name }}</h3>
          <p>{{ link.description }}</p>
          <div class="link-url">{{ link.url }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const links = ref([
  {
    id: 1,
    name: '郑州轻工业大学官网',
    url: 'https://www.zzuli.edu.cn/',
    description: '郑州轻工业大学官方网站，提供学校新闻、通知公告和教育资源。',
    icon: '🏫'
  },
  {
    id: 2,
    name: '失意&小库',
    url: 'http://reblog.shiyio.uk',
    description: '一个初学java的菜鸟的博客,备用地址http://blog.shiyio.uk',
    icon: 'src/assets/shiyiblog.jpg'
  }
])
</script>

<style scoped>
.friend-links-container {
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.links-list {
  display: flex;
  flex-direction: column;
}

.friend-link-card {
  display: flex;
  text-decoration: none;
  color: inherit;
  align-items: flex-start;
  margin-bottom: 20px;
  animation: slide-in 0.5s ease-out;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.link-icon {
  font-size: 36px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 122, 255, 0.1);
  border-radius: 12px;
}

.link-content {
  flex: 1;
}

.link-content h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--ios-text-color);
}

.link-content p {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.link-url {
  font-size: 12px;
  color: var(--ios-primary-color);
  word-break: break-all;
}

/* Add iOS-style animation for cards */
.friend-link-card:nth-child(1) { animation-delay: 0.1s; }
.friend-link-card:nth-child(2) { animation-delay: 0.2s; }
.friend-link-card:nth-child(3) { animation-delay: 0.3s; }
.friend-link-card:nth-child(4) { animation-delay: 0.4s; }
.friend-link-card:nth-child(5) { animation-delay: 0.5s; }
</style>
