<template>
  <div class="container mx-auto px-6 py-12 md:py-24">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">我的项目</h2>
      <div class="w-24 h-1 bg-primary mx-auto"></div>
      <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
        以下是我最近的一些项目。每个项目都展示了我在不同领域的技能和专长。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(project, index) in projects" :key="index"
        class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
        <div class="relative h-48 overflow-hidden">
          <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <a :href="project.link" target="_blank" class="px-4 py-2 bg-white text-primary font-medium rounded-lg">
              查看项目
            </a>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex"
              class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <a href="#"
        class="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 inline-block">
        查看所有项目
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    title: '电子商务网站',
    description: '一个完全响应式的电子商务平台，具有购物车功能和支付集成。',
    image: '/placeholder.svg?height=300&width=400',
    link: '#',
    tags: ['Vue.js', 'Tailwind CSS', 'Firebase']
  },
  {
    title: '任务管理应用',
    description: '一个具有团队协作功能的拖放式任务管理应用程序。',
    image: '/placeholder.svg?height=300&width=400',
    link: '#',
    tags: ['Vue.js', 'Vuex', 'Node.js']
  },
  {
    title: '作品集网站',
    description: '为摄影师设计的创意作品集网站，带有画廊和联系表单。',
    image: '/placeholder.svg?height=300&width=400',
    link: '#',
    tags: ['HTML/CSS', 'JavaScript', 'GSAP']
  },
  {
    title: '天气仪表板',
    description: '实时天气仪表板，具有天气预报和位置搜索功能。',
    image: '/placeholder.svg?height=300&width=400',
    link: '#',
    tags: ['Vue.js', 'API集成', 'Chart.js']
  },
  {
    title: '食谱应用',
    description: '一个食谱查找器和膳食计划器，带有营养信息。',
    image: '/placeholder.svg?height=300&width=400',
    link: '#',
    tags: ['Vue.js', 'Vuetify', 'REST API']
  },
  {
    title: '社交媒体仪表板',
    description: '社交媒体账户的分析仪表板，带有数据可视化。',
    image: '/placeholder.svg?height=300&width=400',
    link: '#',
    tags: ['Vue.js', 'D3.js', 'Firebase']
  }
]);
</script>