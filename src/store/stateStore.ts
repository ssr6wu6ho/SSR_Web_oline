//stateStore负责管理应用状态,不涉及具体的UI逻辑。
import { defineStore } from "pinia";
//Pinia 库来定义一个 Vuex 存储模块（store）

//用 defineStore 函数来定义一个新的存储模块。'darkMode' 是这个存储模块的唯一标识符。
export const userDarkMOdel = defineStore("darkMode", {
  state: () => ({
    isDark: true,
  }),
  actions: {
    toggleDarkModel() {
      this.isDark = !this.isDark;
    },
  },
});
//储存滚动锁定防止冲突
export const userScrollLock = defineStore("scrollLock", {
  state: () => ({
    isScrolling: false,
  }),
  actions: {
    setScrolling(state: boolean) {
      this.isScrolling = state;
    },
    scrollToPage() {},
  },
});
//存储折叠的侧边栏状态
export const userSlideBarExtend = defineStore("slideBarExtend", {
  state: () => ({
    musicBarExtend: false,
    leftBarExtend: false,
    rightTopBarExtend: false,
  }),
  actions: {
    toggleMusicBarExtend() {
      this.musicBarExtend = !this.musicBarExtend;
    },
    toggleLeftBarExtend() {
      this.leftBarExtend = !this.leftBarExtend;
    },
    toggleRightTopBarExtend() {
      this.rightTopBarExtend = !this.rightTopBarExtend;
    },
  },
});
//存储当前页面
export const userCurrentPage = defineStore("currentPage", {
  state: () => ({
    currentIndex: 0,
  }),
  actions: {
    setCurrentPage(index: number) {
      this.currentIndex = index;
    },
  },
});
//存储是否为第一页面，增加路由监听功能
export const userCurrentView = defineStore("currentView", {
  state: () => ({
    isHomePage: true,
    specialRoutes: ["/blogPage", "/messagePage"], //需要全局跳转的特殊路由
  }),
  actions: {
    checkRouts(path: string) {
      this.isHomePage = !this.specialRoutes.includes(path);
    },
  },
});
