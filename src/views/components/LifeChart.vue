<template>
  <div ref="chartContainer" class=" flex rounded-lg custom-height w-full overflow-hidden"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import * as echarts from 'echarts';

const data = [
  [
    [28604, 77, 17096869, 'Australia', 1990],
    [31163, 77.4, 27662440, 'Canada', 1990],
    [1516, 68, 1154605773, 'China', 1990],
    [13670, 74.7, 10582082, 'Cuba', 1990],
    [28599, 75, 4986705, 'Finland', 1990],
    [29476, 77.1, 56943299, 'France', 1990],
    [31476, 75.4, 78958237, 'Germany', 1990],
    [28666, 78.1, 254830, 'Iceland', 1990],
    [1777, 57.7, 870601776, 'India', 1990],
    [29550, 79.1, 122249285, 'Japan', 1990],
    [2076, 67.9, 20194354, 'North Korea', 1990],
    [12087, 72, 42972254, 'South Korea', 1990],
    [24021, 75.4, 3397534, 'New Zealand', 1990],
    [43296, 76.8, 4240375, 'Norway', 1990],
    [10088, 70.8, 38195258, 'Poland', 1990],
    [19349, 69.6, 147568552, 'Russia', 1990],
    [10670, 67.3, 53994605, 'Turkey', 1990],
    [26424, 75.7, 57110117, 'United Kingdom', 1990],
    [37062, 75.4, 252847810, 'United States', 1990]
  ],
  [
    [44056, 81.8, 23968973, 'Australia', 2015],
    [43294, 81.7, 35939927, 'Canada', 2015],
    [13334, 76.9, 1376048943, 'China', 2015],
    [21291, 78.5, 11389562, 'Cuba', 2015],
    [38923, 80.8, 5503457, 'Finland', 2015],
    [37599, 81.9, 64395345, 'France', 2015],
    [44053, 81.1, 80688545, 'Germany', 2015],
    [42182, 82.8, 329425, 'Iceland', 2015],
    [5903, 66.8, 1311050527, 'India', 2015],
    [36162, 83.5, 126573481, 'Japan', 2015],
    [1390, 71.4, 25155317, 'North Korea', 2015],
    [34644, 80.7, 50293439, 'South Korea', 2015],
    [34186, 80.6, 4528526, 'New Zealand', 2015],
    [64304, 81.6, 5210967, 'Norway', 2015],
    [24787, 77.3, 38611794, 'Poland', 2015],
    [23038, 73.13, 143456918, 'Russia', 2015],
    [19360, 76.5, 78665830, 'Turkey', 2015],
    [38225, 81.4, 64715810, 'United Kingdom', 2015],
    [53354, 79.1, 321773631, 'United States', 2015]
  ],
  //x-------y-------r---name,color
  //年龄-技术力-时间占比-名字-颜色
  [
    [15, 30, 30, '穿越机', 1],
    [16, 45, 50, '穿越机竞速', 1],
    [17, 65, 50, '穿越机竞速', 1],
    [18, 30, 20, '穿越机竞速', 1],
  ],
  [
    [16, 25, 30, '摄影', 2],
    [17, 35, 35, '摄影', 2],
    [18, 45, 30, '摄影', 2],
    [19, 50, 20, '摄影', 2],
    [20, 50, 15, '摄影', 2],
  ],
  [
    [17, 10, 10, '滑板', 4],
    [19, 30, 50, '滑板', 4],
    [20, 50, 45, '滑板', 4],
  ],
  [
    [18, 20, 40, '代码：硬件', 3],
    [19, 35, 45, '代码：基础', 3],
    [20, 45, 55, '代码：全栈', 3],
  ],
];

// 创建一个响应式的 ref 来引用图表容器 DOM 元素
const chartContainer = ref<HTMLDivElement>();
// 初始化图表实例，初始值为 null
let chart: echarts.ECharts | null = null;
const initChart = () => {
  if (!chartContainer.value) return;

  // 定义颜色方案
  // const colorMap = {
  //   1: ['#FF6B6B', '#FF5252'],
  //   2: ['#4ECDC4', '#45B7AF'],
  //   3: ['#96CEB4', '#88C2A8'],
  //   4: ['#FFEE93', '#FFE66D']
  // };
  const chartOptions = {

    title: {
      text: '-----', // 图表标题
      left: '5%', // 标题左对齐位置
      top: '3%', // 标题顶部位置
      textStyle: {
        color: '0xffffff' // 标题文字颜色
      }
    },
    legend: {
      right: '10%', // 图例右对齐位置
      top: '3%', // 图例顶部位置
      data: ['穿越机', '摄影', '滑板', '代码'] // 图例数据
    },
    grid: {
      left: '2%', // 网格左对齐位置
      top: '15%',// 网格顶部位置
      containLabel: true, // 包含坐标轴标签
    },
    xAxis: {
      name: '年龄', // X轴名称
      type: 'value', // X轴类型为数值轴
      min: 15, // X轴最小值
      max: 20, // X轴最大值
      splitLine: {
        lineStyle: {
          type: 'dashed' // X轴分割线样式为虚线
        }
      }
    },
    yAxis: {
      name: '技术力', // Y轴名称
      type: 'value', // Y轴类型为数值轴
      min: 0, // Y轴最小值
      max: 100, // Y轴最大值
      splitLine: {
        lineStyle: {
          type: 'dashed' // Y轴分割线样式为虚线
        }
      }
    },
    series: data.slice(2).map((category) => ({ // 从数据中取出后两个类别进行渲染
      name: category[0][3], // 系列名称
      type: 'scatter', // 系列类型为散点图
      data: category, // 系列数据
      symbolSize: function (data: any) {
        return data[2] * 2; // 根据时间占比决定散点大小
      },
      itemStyle: {
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [ // 设置散点颜色为渐变色
          // { offset: 0, color: colorMap[category[0][4]][0] }, // 渐变起始颜色
          // { offset: 1, color: colorMap[category[0][4]][1] } // 渐变结束颜色
        ]),
        shadowBlur: 10, // 阴影模糊程度
        shadowColor: 'rgba(0, 0, 0, 0.3)', // 阴影颜色
        shadowOffsetY: 3 // 阴影Y轴偏移量
      },
      label: {
        show: true, // 显示标签
        formatter: '{@[3]}', // 标签内容格式化，显示技能名称
        position: 'right', // 标签位置
        color: '0xffffff' // 标签文字颜色
      },
      emphasis: {
        label: {
          show: true, // 高亮状态下显示标签
          fontWeight: 'bold' // 高亮状态下标签文字加粗
        }
      }
    }))
  };

  // 初始化图表实例
  chart = echarts.init(chartContainer.value);
  // 使用配置项设置图表
  chart.setOption(chartOptions);
};

onMounted(() => {
  initChart();
});
onUnmounted(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
});

</script>

<style>
.custom-height {
  height: 600px;
}
</style>