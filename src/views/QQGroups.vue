<template>
  <div class="qq-groups-container">

    <div class="visitor-counter">
      <img src="https://count.getloli.com/@shiyizzuliboard?name=shiyizzuliboard&theme=rule34&padding=7&offset=0&align=center&scale=1&pixelated=1&darkmode=auto" alt=":shiyizzuliboard" />
    </div>
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
    name: '25C语言交流群',
    number: '群聊未能被搜索',
    description: '一个专门为25届学生提供的C语言交流群',
    members: 2000,
    avatar: 'http://p.qlogo.cn/gh/148518259/1025165103/0',
  },
  {
    id: 2,
    name: "郑轻嵌入式交流群",
    number: '967494035',
    description: '一个专门为郑轻嵌入式开发者提供的交流群，欢迎加入！',
    members: 500,
    avatar: 'http://p.qlogo.cn/gh/967494035/967494035/0',
  },
  {
    id: 3,
    name: "25郑轻百度贴吧官方迎新群",
    number: '971991770',
    description: '迎新',
    members: 2000,
    avatar: 'http://p.qlogo.cn/gh/967494035/971991770/0',
  },
  {
    id: 4,
    name: "软件创新实验室2025招新群",
    number: '787632933',
    description: '校内就业目前top1',
    members: 2000,
    avatar: 'http://p.qlogo.cn/gh/967494035/787632933/0',
  },
  {
    id: 5,
    name: "计算机爱好者协会25群",
    number: '905014613',
    description: '计算机高手交流群',
    members: 2000,
    avatar: 'http://p.qlogo.cn/gh/967494035/905014613/0',
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
.visitor-counter {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
}

.visitor-counter img {
  border-radius: 18px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  max-width: 100%;
}

.visitor-counter img:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  color: var(--ios-text-color, #333);
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
