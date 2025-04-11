<template>
  <div class="qq-groups-container">
    <h1 class="section-title">QQ群</h1>

    <div class="groups-list">
      <div
        v-for="group in groups"
        :key="group.id"
        class="ios-card qq-group-card"
      >
        <div class="card-header">
          <div class="avatar">
            <img :src="group.avatar" :alt="group.name">
          </div>
          <div class="group-info">
            <h3>{{ group.name }}</h3>
            <div class="group-number">
              <span>{{ group.number }}</span>
              <button class="ios-button" @click="copyQQNumber(group.number)">复制</button>
            </div>
          </div>
        </div>

        <div class="card-body">
          <p>{{ group.description }}</p>
        </div>

        <div class="card-footer">
          <a :href="'https://qm.qq.com/cgi-bin/qm/qr?k=&jump_from=&auth=-' + group.number"
             target="_blank"
             class="join-button">
            加入群聊
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const groups = ref([
  {
    id: 1,
    name: '24C语言交流群',
    number: '148518259',
    description: '24C语言交流群是一个专门为24C语言开发者提供的交流群，欢迎加入！',
    members: 2000,
    avatar: 'http://p.qlogo.cn/gh/148518259/148518259/0',
  },
])

const copyQQNumber = (number) => {
  navigator.clipboard.writeText(number)
    .then(() => {
      alert('QQ群号已复制到剪贴板！')
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}
</script>

<style scoped>
.qq-groups-container {
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.groups-list {
  display: flex;
  flex-direction: column;
}

.qq-group-card {
  display: flex;
  flex-direction: column;
  width: 100%;
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

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.group-info {
  flex: 1;
}

.group-info h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
}

.group-number {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.ios-button {
  background-color: var(--ios-primary-color);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ios-button:hover {
  background-color: #0062cc;
}

.card-body {
  flex: 1;
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.join-button {
  background-color: var(--ios-primary-color);
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.join-button:hover {
  background-color: #0062cc;
  transform: translateY(-2px);
}

/* Add iOS-style animation for cards */
.qq-group-card:nth-child(1) { animation-delay: 0.1s; }
.qq-group-card:nth-child(2) { animation-delay: 0.2s; }
.qq-group-card:nth-child(3) { animation-delay: 0.3s; }
.qq-group-card:nth-child(4) { animation-delay: 0.4s; }
</style>
