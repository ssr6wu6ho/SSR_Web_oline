<template>
  <div id="loading" v-show="isLoading" ref="loadingElement" class="p-8">
    <div class="relative left-11">
      <p class="relative text-7xl  font-bold" ref="slideText1">{{ currentText[0] }}</p>
      <p class="relative text-9xl font-bold" ref="slideText2">{{ currentText[1] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

//const topText=["Shi","Shuangran","石","爽然","いし","そう","ぜん"];

const buttomText = [
  "welcome", "欢迎", "ようこそ"
];

let ctx: gsap.Context;
const isLoading = ref(false);
const currentText = ref(['', '']);
const loadingElement = ref<HTMLElement | null>(null);
const slideText1 = ref<HTMLElement | null>(null);
const slideText2 = ref<HTMLElement | null>(null);




const show = () => {
  // 先选择随机文本再显示

  currentText.value[1] = buttomText[0];
  isLoading.value = true;

  ctx = gsap.context(() => {
    if (slideText1.value && slideText2.value) {
      // 重置初始位置
      gsap.set([slideText1.value, slideText2.value], {
        y: -window.innerHeight,
        opacity: 0
      });

      // 创建动画时间轴
      const tl = gsap.timeline();
      tl.to([slideText1.value, slideText2.value], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.3
      });
    }
  });

  setTimeout(() => {
    ctx.revert();
  }, 4800); // 稍微短于5秒保持流畅
};

const hide = () => {
  const tl = gsap.timeline();
  if (isLoading.value) {
    tl.to(loadingElement.value, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    });
  }
  tl.call(() => {
    isLoading.value = false;
    ctx?.revert();
    gsap.set([loadingElement.value], { opacity: 1 });
  });
};

onBeforeUnmount(() => {
  ctx?.revert();
});

defineExpose({ show, hide });
</script>

<style scoped>
#loading {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 100000000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(247, 247, 247, 0.9);
  backdrop-filter: blur(5px);
}

/* 添加字体优化 */
p {
  font-family: 'Helvetica Neue', 'Hiragino Kaku Gothic ProN', 'PingFang SC',
    'Microsoft YaHei', sans-serif;
  letter-spacing: -0.05em;
  line-height: 0.85;
  margin: 0.2em 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .left-11 {
    left: 1rem !important;
  }

  p {
    font-size: 4rem !important;
  }
}
</style>