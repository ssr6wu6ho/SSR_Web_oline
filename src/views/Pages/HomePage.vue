<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <!-- 主要内容 -->
    <main class="relative flex min-h-screen items-center px-8 lg:px-16">
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
            大三本科在读 / 欢迎
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
import { ref, onMounted } from 'vue'

// 响应式状态
const displayText = ref('')
const topText = ["<WELCOME TO MY SPACE />", "<STUDENT />", "<SSR />"]
let currentIndex = 0
let textCurrentIndex = 0;

// 技能列表
const skills = [
  'Web Development',
  'UI/UX Design',
  'Full Stack',
  'Creative Coding',
]

const typeTopText = () => {
  if (currentIndex < topText.length) {
    const currentString = topText[currentIndex];
    if (textCurrentIndex < currentString.length) {
      // 显示字符串
      displayText.value += currentString[textCurrentIndex];
      textCurrentIndex++;
      setTimeout(typeTopText, 100);
    } else {
      // 字符串显示完毕，等待一秒
      setTimeout(() => {
        // 回退字符串
        if (textCurrentIndex > 0) {
          displayText.value = displayText.value.slice(0, -1);
          textCurrentIndex--;
          setTimeout(typeTopText, 100);
        } else {
          // 字符串回退完毕，等待一秒
          setTimeout(() => {
            // 重置索引并切换到下一个字符串
            textCurrentIndex = 0;
            currentIndex = (currentIndex + 1) % topText.length; // 循环到下一个字符串
            setTimeout(typeTopText, 100);
          }, 1000);
        }
      }, 1000);
    }
  }
}
const handleMouseMove = (e) => {
  mousePosition.value = { x: e.clientX, y: e.clientY }
}

// 生命周期钩子
onMounted(() => {
  typeTopText()
})


</script>

<style scoped></style>
