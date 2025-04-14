<template>
  <div class="promotion-container">
    <h1 class="section-title">广告推广</h1>

    <!-- iOS风格的顶部轮播广告 -->
    <div class="carousel-container">
      <transition-group name="carousel-slide" tag="div" class="carousel-inner">
        <div
          v-for="(ad, index) in featuredAds"
          :key="ad.id"
          class="carousel-slide ios-card"
          v-show="currentSlide === index"
          @click="openAdLink(ad.link)"
        >
          <img :src="ad.image" :alt="ad.title" class="slide-image">
          <div class="slide-content">
            <h2>{{ ad.title }}</h2>
            <p>{{ ad.description }}</p>
            <div class="ad-badge">广告</div>
          </div>
        </div>
      </transition-group>

      <div class="carousel-indicators">
        <span
          v-for="(ad, index) in featuredAds"
          :key="ad.id"
          class="indicator"
          :class="{ 'active': currentSlide === index }"
          @click="setCurrentSlide(index)"
        ></span>
      </div>
    </div>

    <!-- 广告分类 -->
    <div class="ad-categories">
      <button
        v-for="category in adCategories"
        :key="category.id"
        class="category-button"
        :class="{ 'active': activeCategory === category.id }"
        @click="activeCategory = category.id"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span>{{ category.name }}</span>
      </button>
    </div>

    <!-- 广告列表 -->
    <div class="ads-grid">
      <div
        v-for="ad in filteredAds"
        :key="ad.id"
        class="ad-card ios-card"
        @click="openAdLink(ad.link)"
      >
        <div class="ad-image-container">
          <img :src="ad.image" :alt="ad.title" class="ad-image">
          <div class="ad-badge small">广告</div>
          <div class="ad-company-badge">{{ ad.company }}</div>
        </div>
        <div class="ad-content">
          <h3>{{ ad.title }}</h3>
          <p class="ad-description">{{ ad.description }}</p>
          <div class="ad-meta">
            <span class="ad-category-tag">{{ getCategoryName(ad.categoryId) }}</span>
            <span class="ad-date">{{ ad.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 加入推广 -->
    <div class="cta-section">
      <div class="cta-card ios-card">
        <h2>想要在这里推广您的产品？</h2>
        <p>联系我们获取更多信息和优惠价格</p>
        <button class="ios-button primary" @click="showContactForm = true">立即联系</button>
      </div>
    </div>

    <!-- 联系表单弹窗 -->
    <transition name="modal">
      <div class="modal-overlay" v-if="showContactForm" @click="showContactForm = false">
        <div class="modal-content ios-card" @click.stop>
          <div class="modal-header">
            <h3>联系我们</h3>
            <button class="close-button" @click="showContactForm = false">×</button>
          </div>
          <div class="contact-form">
            <div class="contact-info">
              <div class="contact-icon">📧</div>
              <h4>请通过以下方式联系我们：</h4>
              <p class="contact-email"><strong>QQ邮箱：</strong> 3401187804@qq.com</p>
              <p class="contact-note">发送邮件时请注明您的公司名称和广告需求</p>
            </div>
            <button class="ios-button primary full-width" @click="copyEmailToClipboard">复制邮箱地址</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 复制成功提示 -->
    <transition name="toast">
      <div class="toast-message" v-if="showCopyToast">
        <span class="toast-icon">✓</span>
        <span>邮箱地址已复制到剪贴板</span>
      </div>
    </transition>

    <!-- 提交成功提示 -->
    <transition name="toast">
      <div class="toast-message" v-if="showToast">
        <span class="toast-icon">✓</span>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// 广告分类
const adCategories = ref([
  { id: 'all', name: '全部', icon: '🔍' },
  { id: 'tech', name: '科技', icon: '📱' },
  { id: 'education', name: '教育', icon: '🎓' },
  { id: 'lifestyle', name: '生活', icon: '🏠' },
  { id: 'food', name: '美食', icon: '🍔' },
  { id: 'travel', name: '旅游', icon: '✈️' },
  { id: 'entertainment', name: '娱乐', icon: '🎮' }
]);

const activeCategory = ref('all');

// 精选广告（轮播图）
const featuredAds = ref([
  {
    id: 1,
    title: '林枫云',
    description: '优秀的服务器小厂，性价比高，相同配置下比某某厂性能高大约百分之20左右',
    image: 'https://img.picui.cn/free/2025/04/14/67fc776cd8281.png',
    link: 'https://www.dkdun.cn/aff/ARAFQXQA',
    company: '林枫云',
    categoryId: 'tech'
  },
]);

// 所有广告
const allAds = ref([
  {
    id: 1,
    title: '林枫云',
    description: '优秀的服务器小厂，性价比高，相同配置下比某某厂性能高大约百分之20左右',
    image: 'https://img.picui.cn/free/2025/04/14/67fc776cd8281.png',
    link: 'https://www.dkdun.cn/aff/ARAFQXQA',
    company: '林枫云',
    categoryId: 'tech'
  },
  {
    id: 2,
    title: '野卡',
    description: '目前最权威的海外虚拟卡平台，轻松订阅海外服务，50%价格即可使用原生 ChatGPT Plus/Pro',
    image: 'https://img.gptcard.cn/p/20250201124812358.png',
    link: 'https://yeka.ai/i/XSNSVSHT',
    company: '野卡',
    categoryId: 'tech'
  }
]);

// 过滤广告
const filteredAds = computed(() => {
  if (activeCategory.value === 'all') {
    return allAds.value;
  } else {
    return allAds.value.filter(ad => ad.categoryId === activeCategory.value);
  }
});

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = adCategories.value.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};

// 轮播图控制
const currentSlide = ref(0);
let slideInterval = null;

const setCurrentSlide = (index) => {
  currentSlide.value = index;
};

const startSlideshow = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % featuredAds.value.length;
  }, 5000);
};

// 打开广告链接
const openAdLink = (link) => {
  window.open(link, '_blank');
};

// 联系表单
const showContactForm = ref(false);
const showCopyToast = ref(false);

// 复制邮箱到剪贴板
const copyEmailToClipboard = () => {
  const email = '1234567890@qq.com';
  navigator.clipboard.writeText(email).then(() => {
    showCopyToast.value = true;
    setTimeout(() => {
      showCopyToast.value = false;
    }, 2000);
  });
};

// 提交表单
const showToast = ref(false);
const toastMessage = ref('');

const submitContactForm = () => {
  // 这里可以添加表单验证和提交逻辑

  // 模拟提交成功
  showContactForm.value = false;
  toastMessage.value = '提交成功！我们会尽快与您联系';
  showToast.value = true;

  // 3秒后隐藏提示
  setTimeout(() => {
    showToast.value = false;
  }, 3000);

  // 重置表单
  // contactForm.value = {
  //   company: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   message: ''
  // };
};

// 生命周期钩子
onMounted(() => {
  startSlideshow();
});

onBeforeUnmount(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>

<style scoped>
.promotion-container {
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
}

/* 轮播广告样式 */
.carousel-container {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  border-radius: var(--ios-border-radius);
}

.carousel-inner {
  position: relative;
  height: 300px;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--ios-border-radius);
  box-shadow: var(--ios-shadow);
  cursor: pointer;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.slide-content h2 {
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 600;
}

.slide-content p {
  margin: 0;
  font-size: 16px;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  width: 20px;
  background-color: white;
}

/* 广告标识 */
.ad-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.ad-badge.small {
  font-size: 10px;
  padding: 2px 6px;
}

.ad-company-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 122, 255, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

/* 轮播图动画 */
.carousel-slide-enter-active,
.carousel-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.carousel-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.carousel-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* 广告分类 */
.ad-categories {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
}

.category-button {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: var(--ios-light-gray);
  border: none;
  border-radius: 20px;
  font-size: 14px;
  color: var(--ios-text-color);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-button.active {
  background-color: var(--ios-primary-color);
  color: white;
}

.category-icon {
  margin-right: 6px;
  font-size: 16px;
}

/* 广告列表 */
.ads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.ad-card {
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ad-card:hover {
  transform: translateY(-5px);
}

.ad-image-container {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ad-card:hover .ad-image {
  transform: scale(1.05);
}

.ad-content {
  padding: 15px;
}

.ad-content h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--ios-text-color);
}

.ad-description {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--ios-gray-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ad-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.ad-category-tag {
  background-color: var(--ios-light-gray);
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--ios-gray-color);
}

.ad-date {
  color: var(--ios-gray-color);
}

/* 加入推广 */
.cta-section {
  margin-bottom: 40px;
}

.cta-card {
  padding: 30px;
  text-align: center;
  background: linear-gradient(135deg, #007aff, #5ac8fa);
  color: white;
}

.cta-card h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.cta-card p {
  font-size: 16px;
  margin-bottom: 20px;
}

.ios-button {
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ios-button.primary {
  background-color: white;
  color: #007aff;
}

.ios-button.primary:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.ios-button.full-width {
  width: 100%;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  padding: 0;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--ios-gray-color);
}

/* 联系表单 */
.contact-form {
  padding: 20px;
}

.contact-info {
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--ios-light-gray);
  border-radius: 10px;
  text-align: center;
}

.contact-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.contact-info h4 {
  margin: 0 0 15px;
  font-size: 16px;
  font-weight: 600;
}

.contact-email {
  font-size: 16px;
  margin: 10px 0;
  color: var(--ios-primary-color);
}

.contact-note {
  font-size: 14px;
  color: var(--ios-gray-color);
  margin-top: 10px;
}

/* 提示消息 */
.toast-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(52, 199, 89, 0.9);
  color: white;
  padding: 12px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1100;
}

.toast-icon {
  margin-right: 8px;
  font-size: 18px;
}

/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 提示消息动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-inner {
    height: 200px;
  }

  .slide-content h2 {
    font-size: 20px;
  }

  .slide-content p {
    font-size: 14px;
  }

  .ads-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .ad-image-container {
    height: 120px;
  }

  .ad-content {
    padding: 10px;
  }

  .ad-content h3 {
    font-size: 14px;
  }

  .ad-description {
    font-size: 12px;
  }
}
</style>
