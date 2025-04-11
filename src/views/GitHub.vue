<template>
  <div class="github-container">
    <h1 class="section-title">项目信息 & 赞助</h1>

    <div class="website-info-section">
      <div class="ios-card website-info-card">
        <h2 class="subsection-title">关于本网站</h2>
        <div class="info-item">
          <span class="info-label">名称:</span>
          <span class="info-value">{{ websiteInfo.name }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">描述:</span>
          <span class="info-value">{{ websiteInfo.description }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">版本:</span>
          <span class="info-value">{{ websiteInfo.version }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">最后更新:</span>
          <span class="info-value">{{ websiteInfo.lastUpdated }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">开发者:</span>
          <span class="info-value">{{ websiteInfo.author }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">许可证:</span>
          <span class="info-value">{{ websiteInfo.license }}</span>
        </div>
      </div>
    </div>

    <div class="msg">如果需要在添加群聊和友链请添加QQ<p style="color: red">3401187804</p></div>

    <div class="sponsor-section">
      <h2 class="subsection-title">赞助支持</h2>
      <p class="sponsor-intro">如果您觉得这个项目对您有帮助，可以考虑赞助我们，帮助我们持续改进和维护这个项目。</p>
      <div class="sponsor-list">
        <div
          v-for="sponsor in sponsors"
          :key="sponsor.id"
          class="ios-card sponsor-card"
        >
          <div class="sponsor-header">
            <div class="sponsor-icon">{{ sponsor.icon }}</div>
            <h3>{{ sponsor.name }}</h3>
          </div>
          <div class="qrcode">
            <img :src="sponsor.qrcode" :alt="sponsor.name + ' QR Code'">
          </div>
          <p class="sponsor-text">感谢您的支持！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const websiteInfo = ref({
  name: '郑州轻工业大学信息展示栏',
  description: '这是一个基于Vue 3开发的现代化Web应用，用于展示郑州轻工业大学相关的QQ群、友情链接。',
  version: '1.0.0',
  lastUpdated: '2025-04-11',
  author: 'Shi Yi',
  license: 'MIT'
})

const sponsors = ref([
  {
    id: 1,
    name: '微信支付',
    qrcode: 'src/assets/weixin.jpg',
    icon: '💚'
  },
  {
    id: 2,
    name: '支付宝',
    qrcode: 'src/assets/zhifubao.jpg',
    icon: '💙'
  }
])
</script>

<style scoped>

.msg{
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 80%;
}
.msg::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 2px;
  background-position: 0% 100%;
  background-repeat: no-repeat;
  padding-bottom: 2px;
  width: 100%;
  z-index: -1;
}

.github-container {
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.subsection-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: var(--ios-text-color);
}

.website-info-section, .sponsor-section {
  margin-bottom: 30px;
}

.website-info-card {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.info-label {
  font-weight: 600;
  width: 80px;
  color: var(--ios-dark-gray);
}

.info-value {
  flex: 1;
  color: var(--ios-text-color);
}

.sponsor-intro {
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ios-dark-gray);
}

.sponsor-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.sponsor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fade-in 0.5s ease-out;
  width: 200px;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.sponsor-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.sponsor-icon {
  font-size: 24px;
  margin-right: 10px;
}

.sponsor-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.qrcode {
  width: 150px;
  height: 150px;
  margin-bottom: 15px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qrcode img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sponsor-text {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* Add iOS-style animation for cards */
.sponsor-card:nth-child(1) { animation-delay: 0.3s; }
.sponsor-card:nth-child(2) { animation-delay: 0.4s; }

@media (max-width: 768px) {
  .sponsor-list {
    flex-direction: column;
    align-items: center;
  }

  .sponsor-card {
    width: 100%;
    max-width: 250px;
  }
}
</style>
