<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// // 定义图表节点和类别的接口
// interface GraphNode {
//   name: string;
//   symbolSize: number;
//   category: number;
// }

// interface GraphLink {
//   source: string;
//   target: string;
// }

// interface GraphCategory {
//   name: string;
// }

// // 示例数据：技术栈节点和链接
// const techNodes: GraphNode[] = [
//   { name: 'C++', symbolSize: 30, category: 0 },
//   { name: 'Linux', symbolSize: 40, category: 1 },
//   { name: 'Java', symbolSize: 50, category: 0 },
//   { name: 'Python', symbolSize: 30, category: 1 },
//   { name: 'JavaScript', symbolSize: 40, category: 1 },
//   { name: 'HTML5', symbolSize: 30, category: 2 },
//   { name: 'CSS3', symbolSize: 30, category: 2 },
//   { name: 'Vue.js', symbolSize: 40, category: 2 },
//   { name: 'React.js', symbolSize: 30, category: 2 },
//   { name: 'Node.js', symbolSize: 50, category: 2 },
//   { name: 'TensorFlow', symbolSize: 30, category: 3 },
//   { name: 'Keras', symbolSize: 30, category: 3 },
//   { name: 'PyTorch', symbolSize: 30, category: 3 },
// ];

// const techLinks: GraphLink[] = [
//   { source: 'C++', target: 'Linux' },
//   { source: 'C++', target: 'Java' },
//   { source: 'Java', target: 'Spring' },
//   { source: 'Java', target: 'Hibernate' },
//   { source: 'Python', target: 'Django' },
//   { source: 'Python', target: 'Flask' },
//   { source: 'Python', target: 'TensorFlow' },
//   { source: 'Python', target: 'Keras' },
//   { source: 'Python', target: 'PyTorch' },
//   { source: 'JavaScript', target: 'Vue.js' },
//   { source: 'JavaScript', target: 'React.js' },
//   { source: 'JavaScript', target: 'Node.js' },
//   { source: 'HTML5', target: 'Vue.js' },
//   { source: 'HTML5', target: 'React.js' },
//   { source: 'CSS3', target: 'Vue.js' },
//   { source: 'CSS3', target: 'React.js' },
// ];

// const techCategories: GraphCategory[] = [
//   { name: 'Programming Languages' },
//   { name: 'Operating Systems' },
//   { name: 'Web Development' },
//   { name: 'Machine Learning' },
// ];

// 定义响应式图表容器
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

onMounted(async () => {
  // 初始化 ECharts 图表
  if (chartContainer.value) {
    chart = echarts.init(chartContainer.value);

    // 加载数据
    // const option = {
    //   title: {
    //     text: 'Code Technology Stack',
    //     subtext: 'Custom Layout',
    //     top: 'bottom',
    //     left: 'right',
    //   },
    //   tooltip: {},
    //   legend: [
    //     {
    //       data: techCategories.map((category) => category.name),
    //     },
    //   ],
    //   animationDuration: 1500,
    //   animationEasingUpdate: 'quinticInOut',
    //   series: [
    //     {
    //       name: 'Tech Stack',
    //       type: 'graph',
    //       layout: 'force',
    //       force: {
    //         repulsion: 100,
    //         edgeLength: 20, // 调整连线长度
    //       },
    //       data: techNodes,
    //       links: techLinks,
    //       categories: techCategories,
    //       roam: true,
    //       label: {
    //         position: 'right',
    //         formatter: '{b}',
    //       },
    //       lineStyle: {
    //         color: 'source',
    //         curveness: 0.3,
    //       },
    //       emphasis: {
    //         focus: 'adjacency',
    //         lineStyle: {
    //           width: 10,
    //         },
    //       },
    //     },
    //   ],
    // };

    // 设置图表配置
    chart = echarts.init(chartContainer.value);
    // 使用配置项设置图表
    //chart.setOption(option);
  }
});

onUnmounted(() => {
  // 销毁图表实例
  if (chart) {
    chart.dispose();
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>