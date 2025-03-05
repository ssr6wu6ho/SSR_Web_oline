<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <!-- 星空背景 -->
    <div class="fixed inset-0">
      <!-- 渐变背景 -->

      <!-- 星星 -->
      <div class="absolute inset-0">
        <div v-for="i in 50" :key="i" class="star" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }" />
      </div>
    </div>

    <!-- 鼠标跟随效果 -->
    <div class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300" :style="{
      background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 255, 0.03), transparent 80%)`
    }" />

    <!-- 主要内容 -->
    <main class="relative z-10 flex min-h-screen items-center px-8 lg:px-16">
      <div class="w-full max-w-5xl animate-float">
        <!-- 标题区域 -->
        <div class="space-y-6 backdrop-blur-sm p-6 rounded-2xl bg-white/5">
          <h2 class="text-xl font-medium tracking-wide text-gray-400">
            {{ displayText }}
          </h2>

          <h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-gray-100">
            Shi ShuangRan
            <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              🛹👻🛹
            </span>
          </h1>

          <p class="max-w-[600px] text-lg text-gray-400">
            大三本科在读 / 欢迎来到我的赛博小屋
          </p>
        </div>

        <!-- 技能标签 -->
        <div class="mt-12 flex flex-wrap gap-3">
          <div v-for="skill in skills" :key="skill"
            class="group cursor-pointer rounded-full backdrop-blur-md transition-all hover:scale-105 hover:-translate-y-1 bg-zinc-800/50 hover:bg-zinc-700/50">
            <span class="flex items-center gap-2 px-4 py-2 text-sm text-gray-300">
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- 按钮组 -->
        <div class="mt-12 flex gap-4">
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式状态
const mousePosition = ref({ x: 0, y: 0 })
const displayText = ref('')
const targetText = 'WELCOME TO MY SPACE'
let currentIndex = 0

// 技能列表
const skills = [
  'Web Development',
  'UI/UX Design',
  'Full Stack',
  'Creative Coding',
]

// 方法
const openLink = (url) => {
  window.open(url, '_blank')
}

const typeText = () => {
  if (currentIndex < targetText.length) {
    displayText.value += targetText[currentIndex]
    currentIndex++
    setTimeout(typeText, 100)
  }
}

const handleMouseMove = (e) => {
  mousePosition.value = { x: e.clientX, y: e.clientY }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  typeText()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
/* 星星动画 */
.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle var(--duration, 2s) infinite;
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
  }
}

/* 渐变动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
  background-size: 200% 200%;
}

/* 浮动动画 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
