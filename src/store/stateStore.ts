//stateStore�������Ӧ��״̬,���漰�����UI�߼���
import { defineStore } from "pinia";
//Pinia ��������һ�� Vuex �洢ģ�飨store��

//�� defineStore ����������һ���µĴ洢ģ�顣'darkMode' ������洢ģ���Ψһ��ʶ����
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
//�������������ֹ��ͻ
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
//�洢�۵��Ĳ����״̬
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
//�洢��ǰҳ��
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
//�洢�Ƿ�Ϊ��һҳ�棬����·�ɼ�������
export const userCurrentView = defineStore("currentView", {
  state: () => ({
    isHomePage: true,
    specialRoutes: ["/blogPage", "/messagePage"], //��Ҫȫ����ת������·��
  }),
  actions: {
    checkRouts(path: string) {
      this.isHomePage = !this.specialRoutes.includes(path);
    },
  },
});
