<template>
  <MainView />
</template>

<script setup>
import MainView from './views/MainView.vue';
import Main from './App_copy.vue';

</script>

<style>
/* 整体滚动条 */
::-webkit-scrollbar {
  width: 10px; /* 滚动条宽度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: linear-gradient(90deg, rgba(241, 241, 241, 0.8), rgba(255, 255, 255, 0.8)); /* 渐变背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* 内部阴影 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #6b4646; /* 滑块背景颜色 */
  border-radius: 10px; /* 圆角 */
  border: 3px solid transparent; /* 边框 */
  background-clip: padding-box; /* 背景裁剪 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5); /* 内部阴影 */
}

/* 滑块悬停状态 */
::-webkit-scrollbar-thumb:hover {
  background-color: #553a3a; /* 悬停时的背景颜色 */
}
</style>