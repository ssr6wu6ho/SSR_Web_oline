<!--职责：主文件负责布局和状态栏的位置信息，但不直接处理状态栏的折叠逻辑。-->
<template>
  <!--pointer-events-none pointer-events: none;，这样鼠标事件会穿透该组件，从而不会影响滚动条的使用。-->
  <starBackground :is-dark="darkModeStore.isDark" class="fixed pointer-events-none" />
  <!-- 鼠标跟随效果 -->
  <div class=" fixed transition-opacity duration-300" :style="getMouseFollowStyle(1, 1)"></div>
  <!-- <LoadAnimation ref="loadAnimation" /> -->
  <!--全局背景以及字体颜色-->
  <div class="min-h-screen font-mono transition-colors duration-300" :class="[
    darkModeStore.isDark
      ? 'bg-gradient-to-r from-zinc-900 to-purple-950 text-gray-400'
      : 'bg-gradient-to-r from-gray-700 to-gray-500 text-zinc-800',
  ]">
    <!-- 右上角 -->
    <div :class="[windowWidth < 768 ? 'fixed top-12 right-6 z-10' : 'fixed top-6 right-6 z-10']">
      <RightTopPanel />
    </div>
    <!-- 左侧浮动面板 -->
    <div v-show="currentPageStore.currentIndex" class="fixed duration-300 z-10" :class="[windowWidth < 768
      ? 'right-6 top-4 -translate-x-1/2'
      : 'left-6 top-8'
    ]" :style="windowWidth < 768 ? { transform: 'rotate(90deg)' } : {
      transform: `perspective(1500px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg) scale(1.02)`,
    }">
      <LeftPanel />
    </div>

    <!-- 主要内容区域 -->
    <div v-if="currentViewStore.isHomePage" class="duration-300 z-50"
      :class="[slideBarExtendStore.leftBarExtend ? 'ml-[300px]' : 'ml-[50px]']">
      <main>
        <section ref="homePage" id="page-0">
          <HomePage />
        </section>
        <section ref="techPage" id="page-2">
          <TechPage />
        </section>
        <section ref="lifePage" id="page-3">
          <LifePage />
        </section>
        <section ref="musicPage" id="page-4">
          <MusicListPage />
        </section>
      </main>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
    <!-- 音乐播放器 -->
    <div v-show="currentPageStore.currentIndex" class="fixed bottom-6 right-6 duration-300 z-10"
      :style="getMouseFollowStyle(1, 10)">
      <MusicPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  userDarkMOdel,
  userSlideBarExtend,
  userCurrentView,
  userCurrentPage
} from "../store/stateStore";
import MusicPanel from "./components/MusicPanel.vue";
import LeftPanel from "./components/LeftPanel.vue";
import RightTopPanel from "./components/RightTopPanel.vue";
// import LoadAnimation from "../utils/LoadAnimation.vue";
import starBackground from "./starBackground.vue";
import TechPage from "./Pages/TechPage.vue";
import LifePage from "./Pages/LifePage.vue";
import MusicListPage from "./Pages/MusicListPage.vue";
import HomePage from "./Pages/HomePage.vue";
import { useRouter } from 'vue-router'
// const loadAnimation = ref();
//状态获取
const router = useRouter();
const darkModeStore = userDarkMOdel();
const slideBarExtendStore = userSlideBarExtend();
const currentViewStore = userCurrentView();
const currentPageStore = userCurrentPage();
//辅助响应的
const windowWidth = ref(window.innerWidth);
const mouseX = ref(0);
const mouseY = ref(0);
//页面获取
const homePage = ref<HTMLElement | null>(null);
const techPage = ref<HTMLElement | null>(null);
const lifePage = ref<HTMLElement | null>(null);
const musicPage = ref<HTMLElement | null>(null);

// 监听路由变化
watch(() => router.currentRoute.value.path, (newPath) => {
  currentViewStore.checkRouts(newPath)
  console.log(router.currentRoute.value.path)
})

// pinia订阅
currentPageStore.$subscribe((mutation, state) => {
  if (state.currentIndex === 0) {
    // 进入 HomePage 时强制收起侧边栏
    slideBarExtendStore.leftBarExtend = false;
    slideBarExtendStore.musicBarExtend = false;
  }
  console.log(mutation);
});

const renewNavBar = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  // 检查哪个部分在视图中
  if (homePage.value && scrollPosition < homePage.value.offsetTop + homePage.value.offsetHeight) {
    currentPageStore.setCurrentPage(0);
  } else if (techPage.value && scrollPosition < techPage.value.offsetTop + techPage.value.offsetHeight) {
    currentPageStore.setCurrentPage(1);
  } else if (lifePage.value && scrollPosition < lifePage.value.offsetTop + lifePage.value.offsetHeight) {
    currentPageStore.setCurrentPage(2);
  } else if (musicPage.value && scrollPosition < musicPage.value.offsetTop + musicPage.value.offsetHeight) {
    currentPageStore.setCurrentPage(3);
  }
}

onMounted(async () => {
  //loadAnimation.value.show();
  window.addEventListener("resize", updateWidth);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", renewNavBar);
  updateWidth();
  renewNavBar();
  slideBarExtendStore.leftBarExtend = false;
  slideBarExtendStore.musicBarExtend = false;
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
  window.removeEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", renewNavBar);
});

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  slideBarExtendStore.leftBarExtend = windowWidth.value >= 1024;
  slideBarExtendStore.musicBarExtend = windowWidth.value >= 1024;
};
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2; // 归一化为[-1,1]
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2;
};
// 鼠标跟随移动的计算方法
const getMouseFollowStyle = (scaleFactor: number, rotateFactor: number) => {
  return {
    transform: `perspective(1000px) 
      rotateY(${mouseX.value * rotateFactor}deg) 
      rotateX(${-mouseY.value * rotateFactor}deg) 
      scale(${scaleFactor})`
  };
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background-color: #8661618e;
  border-radius: 10px;
  border: 3px solid transparent;
}
</style>