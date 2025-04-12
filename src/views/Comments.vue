<template>
  <div class="comments-container">
    <h1 class="section-title">评论区</h1>

    <!-- 评论过滤选项 -->
    <div class="filter-options">
      <button
        v-for="filter in filters"
        :key="filter.id"
        class="filter-button"
        :class="{ 'active': activeFilter === filter.id }"
        @click="activeFilter = filter.id"
      >
        {{ filter.name }}
      </button>
    </div>

    <!-- 错误消息气泡 -->
    <div v-if="errorMessage" class="error-bubble">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span>{{ errorMessage }}</span>
      </div>
      <button class="retry-button" @click="retryLoading">重试</button>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <transition-group name="comment">
        <div
          v-for="comment in paginatedComments"
          :key="comment.index"
          class="ios-card comment-card"
        >
          <div class="comment-header">
            <div class="avatar">
              <img :src="comment.avatarUrl" alt="User Avatar">
            </div>
            <div class="user-info">
              <h3>{{ comment.username }}</h3>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
          </div>

          <div class="comment-body">
            <p>{{ comment.title }}</p>
          </div>

          <div class="comment-footer">
            <div class="action-button" @click="likeComment(comment)">
              <span :class="{ 'liked': comment.liked }">❤️</span>
              <span>{{ comment.likes }}</span>
            </div>
<!--            <div class="action-button">-->
<!--              <span>🔄</span>-->
<!--              <span>分享</span>-->
<!--            </div>-->
          </div>
        </div>
      </transition-group>


      <!-- 分页控件 -->
<!--      <div class="pagination" v-if="allComments.length > 0">-->
<!--        <button-->
<!--          class="pagination-button"-->
<!--          :disabled="currentPage === 1"-->
<!--          @click="changePage(currentPage - 1)"-->
<!--        >-->
<!--          <span>←</span>-->
<!--        </button>-->

<!--        <div class="page-info">-->
<!--          <span>第 {{ currentPage }} 页</span>-->
<!--        </div>-->

<!--        <button-->
<!--          class="pagination-button"-->
<!--          :disabled="!hasMorePages"-->
<!--          @click="changePage(currentPage + 1)"-->
<!--        >-->
<!--          <span>→</span>-->
<!--        </button>-->
<!--      </div>-->

<!--      &lt;!&ndash; 加载更多按钮 (iOS风格替代方案) &ndash;&gt;-->
<!--      <div class="load-more-container" v-if="allComments.length > 0 && hasMorePages">-->
<!--        <button-->
<!--          class="load-more-button"-->
<!--          @click="loadMore"-->
<!--          :disabled="!hasMorePages"-->
<!--        >-->
<!--          加载更多评论-->
<!--        </button>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from "axios";
import  parseHtmlComments  from '/src/data/parse_html_comments.js';

// 过滤选项
const filters = ref([
  { id: 'all', name: '全部评论' },
  { id: 'hot', name: '热门' },
  { id: 'latest', name: '最新' }
])
const activeFilter = ref('all')

// 错误消息
const errorMessage = ref(null)
// 是否有更多页
const hasMorePages = ref(true)

// 评论数据

const githubComments = async (pageNumber)=>{
  const result = []

  try {
    console.log('正在获取GitHub评论数据，页码:', pageNumber)
    const html = await fetchHtml('/github-api/2743305544/zzuli-board/issues?page=' + pageNumber)
    const parseHtmlComments1 = parseHtmlComments(html, 'https://img.picui.cn/free/2025/04/12/67f9db6d87769.jpg');

    if (parseHtmlComments1 && parseHtmlComments1.length > 0) {
      const updatedComments = parseHtmlComments1.map(comment => ({
        ...comment, // Spread the existing fields
        ['likes']: Math.floor(Math.random() * 50),
        ['liked']: Math.random() > 0.7
      }));
      result.push(...updatedComments)
      // 清除错误消息
      errorMessage.value = null

      // 如果有评论数据，表示当前页有效
      hasMorePages.value = true
    } else {
      console.log('当前页没有评论数据')
      errorMessage.value = '当前页没有更多评论了'
      hasMorePages.value = false
    }
  } catch (error) {
    console.error('获取GitHub评论失败:', error)
    errorMessage.value = '获取GitHub评论失败，请检查网络连接后重试。'
    hasMorePages.value = false
  }

  return result
}

async function fetchHtml(url) {
  try {
    console.log('正在请求URL:', url)
    const response = await axios.get(url, { timeout: 10000 });
    return response.data; // This will contain the HTML content
  } catch (error) {
    console.error('Error fetching HTML:', error);
    throw error; // Rethrow the error for further handling if needed
  }
}


// 模拟更多评论数据
const generateComments = (count) => {
  const result = []
  const names = ['张同学', '王老师', '刘同学', '赵同学', '李同学', 'nqk', '周同学', '吴同学']
  const contents = [
    '这个信息展示栏设计得很好，界面简洁清晰，信息一目了然！',
    '同学们可以在这里交流学习心得，希望大家积极参与讨论！',
    '请问有人知道如何加入C语言交流群吗？',
    '在QQ群页面可以找到群号，直接点击加入就可以了',
    '这个评论区功能很实用，可以方便地交流信息',
    '希望能增加更多的功能，比如图片上传',
    '界面设计很符合iOS风格，赞一个！',
    '动画效果很流畅，使用体验很好',
    '这个项目是用Vue开发的吗？代码结构很清晰',
    '希望能添加暗黑模式支持'
  ]
  const times = ['刚刚', '5分钟前', '10分钟前', '半小时前', '1小时前', '2小时前', '昨天', '前天', '3天前', '一周前']

  for (let i = 1; i <= count; i++) {
    const nameIndex = Math.floor(Math.random() * names.length)
    const contentIndex = Math.floor(Math.random() * contents.length)
    const timeIndex = Math.floor(Math.random() * times.length)
    const likes = Math.floor(Math.random() * 50)

    result.push({
      id: i,
      username: names[nameIndex],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(names[nameIndex])}&background=${Math.floor(Math.random()*16777215).toString(16)}&color=fff`,
      content: contents[contentIndex],
      time: times[timeIndex],
      likes: likes,
      liked: Math.random() > 0.7
    })
  }

  return result
}



// 分页设置
const itemsPerPage = ref(25)
const currentPage = ref(1)

// 评论数据
const allComments = ref([])

// 页面加载时获取评论
const loadComments = async () => {
  try {
    console.log('加载评论，当前页码:', currentPage.value)
    // 清除之前的错误消息
    errorMessage.value = null

    const comments = await githubComments(currentPage.value)

    // 如果没有获取到评论且有错误消息，则不更新评论列表
    if (comments.length === 0 && errorMessage.value) {
      return
    }

    if (activeFilter.value === 'latest' || activeFilter.value === 'hot') {
      // 如果是按最新或热门排序，替换所有评论
      allComments.value = comments
    } else {
      // 如果是全部评论，追加新评论（加载更多模式）
      if (currentPage.value === 1) {
        // 第一页时替换所有评论
        allComments.value = comments
      } else {
        // 其他页面追加评论
        allComments.value = [...allComments.value, ...comments]
      }
    }
  } catch (error) {
    console.error('加载评论失败:', error)
    errorMessage.value = '加载评论失败，请稍后重试。'
  }
}

// 初始加载评论
loadComments()

// 根据过滤条件显示评论
const filteredComments = computed(() => {
  if (activeFilter.value === 'hot') {
    return [...allComments.value].sort((a, b) => b.likes - a.likes)
  } else if (activeFilter.value === 'latest') {
    // 这里简化处理，实际应该基于时间戳排序
    return [...allComments.value].sort((a, b) => {
      // Convert the timestamp strings to Date objects for comparison
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }
  return allComments.value
})

// 当前页显示的评论
const paginatedComments = computed(() => {
  // 如果是加载更多模式，直接返回所有评论
  if (activeFilter.value === 'all') {
    return allComments.value
  }

  // 如果是按最新或热门排序，则进行分页
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  return filteredComments.value.slice(startIndex, startIndex + itemsPerPage.value)
})

// 切换页码
const changePage = (page) => {
  if (page >= 1) {
    // 如果是向前翻页，总是允许
    if (page < currentPage.value) {
      currentPage.value = page

      // 添加iOS风格的触觉反馈（如果浏览器支持）
      if (navigator.vibrate) {
        navigator.vibrate(5)
      }

      // 滚动到页面顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    // 如果是向后翻页，需要检查是否有更多页
    else if (page > currentPage.value && hasMorePages.value) {
      currentPage.value = page

      // 添加iOS风格的触觉反馈（如果浏览器支持）
      if (navigator.vibrate) {
        navigator.vibrate(5)
      }

      // 滚动到页面顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      // 加载新一页的评论
      loadComments()
    }
  }
}

// 加载更多评论（iOS风格的替代分页方式）
const loadMore = () => {
  if (hasMorePages.value) {
    currentPage.value++

    // 添加iOS风格的触觉反馈（如果浏览器支持）
    if (navigator.vibrate) {
      navigator.vibrate(5)
    }

    // 加载新一页的评论
    loadComments()
  }
}

// 点赞评论
const likeComment = (comment) => {
  if (comment.liked) {
    comment.likes--
  } else {
    comment.likes++
    // 添加iOS风格的触觉反馈（如果浏览器支持）
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }
  comment.liked = !comment.liked
}

// 重试加载评论
const retryLoading = () => {
  errorMessage.value = null
  loadComments()
}
</script>

<style scoped>
.comments-container {
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
}

/* 过滤选项 */
.filter-options {
  display: flex;
  margin-bottom: 15px;
  overflow-x: auto;
  padding-bottom: 5px;
  -webkit-overflow-scrolling: touch;
}

.filter-button {
  background-color: var(--ios-light-gray);
  border: none;
  border-radius: 15px;
  padding: 6px 12px;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.filter-button.active {
  background-color: var(--ios-primary-color);
  color: white;
}

.filter-button:not(.active):hover {
  background-color: #e5e5ea;
}

/* 错误消息气泡 */
.error-bubble {
  background-color: var(--ios-light-gray);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.error-content {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.error-icon {
  font-size: 18px;
  margin-right: 5px;
  color: var(--ios-danger-color);
}

.retry-button {
  background-color: var(--ios-primary-color);
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background-color: #007aff;
}

/* 评论列表 */
.comments-list {
  display: flex;
  flex-direction: column;
}

.comment-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
}

/* iOS风格的滑入动画 */
.comment-enter-active {
  transition: all 0.5s ease;
}

.comment-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.comment-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.comment-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.comment-move {
  transition: transform 0.5s ease;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.comment-time {
  font-size: 12px;
  color: var(--ios-gray-color);
}

.comment-body {
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
}

.comment-footer {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 14px;
  color: var(--ios-gray-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button span {
  margin-right: 5px;
}

.action-button:hover {
  color: var(--ios-primary-color);
}

.action-button .liked {
  color: var(--ios-danger-color);
}

/* 分页控件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.pagination-button {
  background-color: var(--ios-light-gray);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #e5e5ea;
}

.page-info {
  margin: 0 10px;
  font-size: 14px;
}

/* 加载更多按钮 (iOS风格替代方案) */
.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
}

.load-more-button {
  background-color: var(--ios-light-gray);
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  color: var(--ios-primary-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-button:not(:disabled):hover {
  background-color: #e5e5ea;
  transform: translateY(-2px);
}

.load-more-button:disabled {
  color: var(--ios-gray-color);
  cursor: not-allowed;
}

/* 调试信息 */
.debug-info {
  margin-top: 20px;
  padding: 10px;
  background-color: var(--ios-light-gray);
  border-radius: 10px;
  font-size: 14px;
}

.debug-info p {
  margin-bottom: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .comments-container {
    padding: 5px;
  }

  .comment-card {
    padding: 12px;
  }

  .page-info {
    font-size: 12px;
  }
}
</style>
