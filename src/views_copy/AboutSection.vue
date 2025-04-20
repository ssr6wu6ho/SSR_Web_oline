<template>
  <div class="container mx-auto px-6 py-12 md:py-24">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">关于我</h2>
      <div class="w-24 h-1 bg-primary mx-auto"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div class="relative">
          <img src="" alt="关于我" class="rounded-lg shadow-xl w-full max-w-md mx-auto" />
          <div class="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary rounded-lg z-0"></div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">我是谁</h3>
        <p class="text-gray-600 mb-6">
          我是一名充满激情的前端开发者，拥有5年创建美观、响应式网站和应用程序的经验。
          我专注于Vue.js、React和现代CSS框架。
        </p>

        <h3 class="text-2xl font-semibold text-gray-800 mb-4">我的技能</h3>
        <div class="space-y-4">
          <div v-for="(skill, index) in skills" :key="index">
            <div class="flex justify-between mb-1">
              <span class="font-medium text-gray-700">{{ skill.name }}</span>
              <span class="text-gray-500">{{ skill.level }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-primary rounded-full h-2" :style="{ width: `${skill.level}%` }"></div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <a href="#"
            class="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300 inline-block">
            下载简历
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const skills = ref([
  { name: 'HTML & CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'Vue.js', level: 92 },
  { name: 'React', level: 85 },
  { name: 'UI/UX 设计', level: 80 }
]);
</script>