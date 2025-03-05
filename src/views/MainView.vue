<!--职责：主文件负责布局和状态栏的位置信息，但不直接处理状态栏的折叠逻辑。-->
<!--使用状态：通过Pinia store获取状态栏的折叠状态，并根据状态调整布局。-->
<template>
  <starBackground :is-dark="darkModeStore.isDark" class="fixed inset-0 z-5" />
  <!-- <LoadAnimation ref="loadAnimation" /> -->
  <!--全局背景以及字体颜色-->
  <div class="min-h-screen font-mono transition-colors duration-300" :class="[
    darkModeStore.isDark
      ? 'bg-gradient-to-r from-zinc-900 to-purple-950 text-gray-400'
      : 'bg-gradient-to-r from-gray-700 to-gray-500 text-zinc-800',
  ]">
    <!-- 右上角 -->
    <div class="fixed top-6 right-6 z-50">
      <RightTopPanel />
    </div>

    <!-- 左侧浮动面板 -->
    <div v-show="currentPageStore.currentIndex" class="fixed left-6 top-8 duration-300 z-50"
      :class="[slideBarExtendStore.leftBarExtend ? 'w-[250px]' : 'w-[10px]']" :style="{
        transform: `perspective(1500px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5
          }deg) scale(1.02)`,
      }">
      <LeftPanel />
    </div>
    <!-- 主要内容区域 -->
    <div v-if="currentViewStore.isHomePage" class="duration-300"
      :class="[slideBarExtendStore.leftBarExtend ? 'ml-[300px]' : 'ml-[50px]']">
      <!-- 包裹所有页面并启用滚动 -->
      <div ref="scrollContainer" class="overflow-y-auto h-screen ">
        <div class="w-full">
          <div ref="homePage">
            <HomePage />
          </div>
          <div ref="techPage">
            <TechPage />
          </div>
          <div ref="lifePage">
            <LifePage />
          </div>
          <div ref="musicPage">
            <MusicListPage />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
    <!-- 音乐播放器 -->
    <div class="fixed bottom-6 right-6 duration-300 z-50"
      :class="[slideBarExtendStore.musicBarExtend ? 'w-[300px]' : 'w-[200px]']" :style="{
        transform: `perspective(1000px) 
            rotateY(${mouseX * 10}deg)
            rotateX(${-mouseY * 10}deg)
            scale(1.02)`,
      }">
      <MusicPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  userDarkMOdel,
  userSlideBarExtend,
  userCurrentPage,
  userCurrentView
} from "../store/stateStore";
import Lenis from "lenis";
import MusicPanel from "./components/MusicPanel.vue";
import LeftPanel from "./components/LeftPanel.vue";
import RightTopPanel from "./components/RightTopPanel.vue";
// import LoadAnimation from "../utils/LoadAnimation.vue";
import starBackground from "./starBackground.vue";

// import { getMessages, insertMessage } from "../request/message.js";

// // 使用 getMessages 函数
// getMessages().then((messages) => {
//   console.log("Fetched messages:", messages);
// });

// // 使用 insertMessage 函数
// const newMessage = {
//   user_id: "123e4567-e89b-12d3-a456-426614174003",
//   content: "This is a new test message!",
// };

// insertMessage(newMessage).then((result) => {
//   console.log("Inserted message result:", result);
// });



import TechPage from "./Pages/TechPage.vue";
import LifePage from "./Pages/LifePage.vue";
import MusicListPage from "./Pages/MusicListPage.vue";
import HomePage from "./Pages/HomePage.vue";

import { useRouter } from 'vue-router'

const lenis = ref<Lenis>();
const router = useRouter();

// const loadAnimation = ref();
//页面元素
const scrollContainer = ref<HTMLElement | null>(null);
const pages = ref<HTMLElement[]>([]);
const homePage = ref<HTMLElement | null>(null);
const techPage = ref<HTMLElement | null>(null);
const lifePage = ref<HTMLElement | null>(null);
const musicPage = ref<HTMLElement | null>(null);
//状态获取
const darkModeStore = userDarkMOdel();
const slideBarExtendStore = userSlideBarExtend();
const currentPageStore = userCurrentPage();
const currentViewStore = userCurrentView()
//辅助响应的
const windowWidth = ref(window.innerWidth);
const mouseX = ref(0);
const mouseY = ref(0);
// 获取所有页面
const getPages = () => {
  pages.value = [
    homePage.value!,
    techPage.value!,
    lifePage.value!,
    musicPage.value!,
  ];
};

// 监听路由变化
watch(() => router.currentRoute.value.path, (newPath) => {
  currentViewStore.checkRouts(newPath)
  console.log(router.currentRoute.value.path)
  if (currentViewStore.isHomePage) {
    // 回到首页逻辑
    currentPageStore.setCurrentPage(0)
    lenis.value?.scrollTo(0, { immediate: true })
  } else {
    // 执行全局跳转
    router.push(newPath)
  }
})

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  slideBarExtendStore.leftBarExtend = windowWidth.value >= 1024;
  slideBarExtendStore.musicBarExtend = windowWidth.value >= 1024;
};
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2; // 归一化为[-1,1]
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2;
};
const initLenis = () => {
  if (scrollContainer.value) {
    lenis.value = new Lenis({
      wrapper: scrollContainer.value, // 指定滚动容器
      duration: 1, // 滚动动画时长
      orientation: "vertical", // 垂直滚动
      gestureOrientation: "vertical",
      smoothWheel: true, // 启用平滑滚动
      infinite: false,
    });
    // 滚动事件处理
    lenis.value.on("scroll", ({ scroll }) => {
      updateCurrentIndex(scroll);
    });
    // RAF循环
    //一个使用 requestAnimationFrame 的递归调用
    // 用于在浏览器每一帧渲染时执行 Lenis 的平滑滚动逻辑
    function raf(time: number) {
      lenis.value?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
};
// 滚动到指定页面
const scrollToPage = (index: number) => {
  if (!lenis.value || !pages.value[index]) return;

  lenis.value.scrollTo(pages.value[index], {
    immediate: false,
    lock: true, // 滚动期间锁定其他交互
    duration: 1,
    onComplete: () => {
      currentPageStore.setCurrentPage(index);
    },
  });
};

// 精准计算当前页面索引
const updateCurrentIndex = (scrollPosition: number) => {
  if (!pages.value) return;

  const containerHeight = scrollContainer.value?.clientHeight || 0;
  const centerThreshold = containerHeight / 2;

  for (let i = 0; i < pages.value.length; i++) {
    const page = pages.value[i];
    const pageTop = page.offsetTop;
    const pageBottom = pageTop + page.offsetHeight;

    if (
      scrollPosition + centerThreshold >= pageTop &&
      scrollPosition + centerThreshold < pageBottom
    ) {
      if (currentPageStore.currentIndex !== i) {
        currentPageStore.setCurrentPage(i);
      }
      break;
    }
  }
};
// 现有的订阅
currentPageStore.$subscribe((mutation, state) => {
  if (state.currentIndex === 0) {
    // 进入 HomePage 时强制收起侧边栏
    slideBarExtendStore.leftBarExtend = false;
    slideBarExtendStore.musicBarExtend = false;
  } else {
    // 切换到其他页面时根据窗口宽度恢复状态
    //slideBarExtendStore.leftBarExtend = windowWidth.value >= 1024;
    scrollToPage(currentPageStore.currentIndex);
  }
  if (mutation) {
    console.log(mutation)
  }
});

onMounted(async () => {
  //loadAnimation.value.show();
  window.addEventListener("resize", updateWidth);
  window.addEventListener("mousemove", handleMouseMove);
  updateWidth();
  slideBarExtendStore.leftBarExtend = false;
  slideBarExtendStore.musicBarExtend = false;
  //setTimeout(() => loadAnimation.value?.hide(), 1000);
  getPages();
  initLenis();


});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<style scoped>
/* 滚动条整体样式 */
::-webkit-scrollbar {
  width: 5px;
  /* 滚动条宽度 */
  background-color: transparent;
  /* 使滚动条背景透明 */
}

/* 滚动条轨道样式 */
::-webkit-scrollbar-track {
  background-color: transparent;
  /* 使轨道背景透明 */
  border-radius: 20px;
  /* 轨道圆角 */
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #8661618e;
  /* 滑块背景颜色 */
  border-radius: 10px;
  border: 3px solid transparent;
  /* 移除边框以减少滑块的可见性 */
}
</style>
