<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300">
      <div class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <div class="text-xl font-bold text-gray-800">我的作品集</div>
          <div class="hidden md:flex space-x-8">
            <a v-for="(item, index) in navItems" :key="index" :href="`#${item.id}`" :class="[
              'transition-colors duration-300 py-2 px-1 border-b-2',
              activeSection === item.id
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            ]" @click.prevent="scrollToSection(item.id)">
              {{ item.name }}
            </a>
          </div>

          <!-- 移动端菜单按钮 -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
        <div class="container mx-auto px-6 py-3">
          <div class="flex flex-col space-y-4">
            <a v-for="(item, index) in navItems" :key="index" :href="`#${item.id}`" :class="[
              'transition-colors duration-300 py-2 px-1 border-l-4',
              activeSection === item.id
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            ]" @click="scrollToSection(item.id); mobileMenuOpen = false">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="pt-16">
      <!-- 首页部分 -->
      <section id="home" ref="homeSection"
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <HomeSection />
      </section>

      <!-- 关于部分 -->
      <section id="about" ref="aboutSection" class="min-h-screen flex items-center justify-center bg-white">
        <AboutSection />
      </section>

      <!-- 项目部分 -->
      <section id="projects" ref="projectsSection" class="min-h-screen flex items-center justify-center bg-gray-50">
        <ProjectsSection />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import HomeSection from './views_copy/HomeSection.vue';
import AboutSection from './views_copy/AboutSection.vue';
import ProjectsSection from './views_copy/ProjectsSection.vue';

// 导航项目
const navItems = [
  { id: 'home', name: '首页' },
  { id: 'about', name: '关于' },
  { id: 'projects', name: '项目' }
];

// 部分引用
const homeSection = ref(null);
const aboutSection = ref(null);
const projectsSection = ref(null);

// 活动部分跟踪
const activeSection = ref('home');
const mobileMenuOpen = ref(false);

// 点击导航项时滚动到部分
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// 根据滚动位置更新活动部分
const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  // 检查哪个部分在视图中
  if (homeSection.value && scrollPosition < homeSection.value.offsetTop + homeSection.value.offsetHeight) {
    activeSection.value = 'home';
  } else if (aboutSection.value && scrollPosition < aboutSection.value.offsetTop + aboutSection.value.offsetHeight) {
    activeSection.value = 'about';
  } else if (projectsSection.value) {
    activeSection.value = 'projects';
  }
};

// 设置交叉观察器以获得更好的滚动检测
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
:root {
  --color-primary: #4f46e5;
  --color-primary-light: #6366f1;
  --color-primary-dark: #4338ca;
}

.text-primary {
  color: var(--color-primary);
}

.border-primary {
  border-color: var(--color-primary);
}

.bg-primary {
  background-color: var(--color-primary);
}

html {
  scroll-behavior: smooth;
}

/* 用于部分之间的平滑滚动 */
html {
  scroll-padding-top: 80px;
  /* 根据导航栏高度调整 */
}
</style>