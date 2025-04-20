<template>
  <div class="container mx-auto px-6 py-12 md:py-24">
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-12 md:mb-0">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
          你好，我是 <span class="text-primary">张三</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          前端开发者 & UI/UX 设计师
        </p>
        <div class="flex space-x-4">
          <a href="#about"
            class="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
            @click.prevent="$emit('scrollTo', 'about')">
            关于我
          </a>
          <a href="#projects"
            class="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            @click.prevent="$emit('scrollTo', 'projects')">
            查看项目
          </a>
        </div>
      </div>
      <div class="md:w-1/2">
        <div class="relative">
          <div class="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 mx-auto overflow-hidden">
            <img src="" alt="个人照片" class="w-full h-full object-cover" />
          </div>
          <div class="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-primary/20 rounded-full z-0"></div>
          <div class="absolute -top-4 -left-4 w-16 h-16 md:w-24 md:h-24 bg-primary/15 rounded-full z-0"></div>
        </div>
      </div>
    </div>

    <div class="mt-24 text-center">
      <p class="text-gray-500 mb-4">向下滚动了解更多</p>
      <div
        class="animate-bounce mx-auto w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center">
        <div class="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件发出一个scrollTo事件，可以由父组件处理
defineEmits(['scrollTo']);
</script>