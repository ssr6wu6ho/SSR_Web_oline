<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-8 flex items-center gap-2 p-10">
      <component :is="CodeIcon" class="w-6 h-6" />
      PROJECTS
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8 justify-content">
      <section class="mb-16 col-span-3  grid grid-cols-2 gap-10">
        <div v-for="project in projects" :key="project.id"
          class="group relative rounded-lg overflow-hidden transition-colors p-4 hover:bg-slate-200/30"
          :class="[darkModeStore.isDark ? 'bg-zinc-800/50' : 'bg-slate-500/30 shadow-lg']">
          <div class="aspect-video relative">
            <img :src="project.image" :alt="project.title"
              class="w-full h-full overflow-hidden rounded-lg object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t overflow-hidden rounded-lg"
              :class="[darkModeStore.isDark ? 'from-zinc-900/90' : 'from-gray-900/70']" />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">{{ project.title }}</h3>
            <p class="text-sm">{{ project.description }}</p>
            <div class="mt-4 flex gap-2">
              <span v-for="tech in project.tech" :key="tech" class="px-2 py-1 text-xs rounded"
                :class="[darkModeStore.isDark ? 'bg-zinc-700' : 'bg-slate-500/30']">
                {{ tech }}
              </span>
            </div>
            <div class="mt-4 flex gap-2">
              <component v-for="icon in project.icon" :key="icon" :is="icon" class=" w-6 h-6">
              </component>
            </div>
            <button class="text-sm font-medium hover:text-white transition-colors md:mt-4">
              Read More →
            </button>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <div class="gap-8 justify-content ">
          <h3 class="text-xl font-bold mb-2 flex items-center">TECH-STACK</h3>
          <div class="p-6 rounded-lg">
            <!-- Frontend Section -->
            <div v-for="skill in TECH_STACK" key="skills" class="mb-8">
              <h3 :class="skill.title" class="text-gray-400 mb-4">{{ skill.title }}</h3>
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <!-- 每个条目容器改用横向排列 -->
                <div v-for="frontend in skill.frontend" class="flex items-center gap-2 p-2">
                  <component :is="frontend.icons" class="w-6 h-6" />
                  <p>{{ frontend.skill }}</p>
                  <div class="flex h-2 rounded-full overflow-hidden"
                    :class="[darkModeStore.isDark ? 'bg-zinc-700' : 'bg-gray-200']">
                    <div class="h-full rounded-full" :class="[frontend.color]" :style="{ width: `${frontend.level}%` }">
                    ssssssssssss</div>
                  </div>
                </div>
                <div v-for="backend in skill.backend" class="flex items-center gap-2 p-2">
                  <component :is="backend.icons" class="w-6 h-6" />
                  <p>{{ backend.skill }}</p>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <div v-for="hardwear in skill.hardWear" class="flex items-center gap-2 p-2">
                  <component :is="hardwear.icons" class="w-6 h-6" />
                  <p>{{ hardwear.skill }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- Fan-like Praise Section 
    <section class="relative">
      <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
        <component :is="CircuitBoardIcon" class="w-6 h-6" />
        PRAISES
      </h2>
      <div class="relative w-full min-h-screen border-2  border-gray-800 rounded-lg overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <div v-for="(praise, index) in praises" :key="praise.id" class="poker" :style="getFanPosition(index)"
            @click="moveToFirst(index)">
            <img class="w-full h-full" :src="praise.image" :alt="'praise image'" />
          </div>
        </div>
      </div>
    </section>
      -->
  </div>
  <svg ref="svgContainer" class="fixed inset-0 w-full h-full pointer-events-none" style="z-index: 999">
    <!-- 这里会动态生成连接线 -->
  </svg>
  <svg>
    <!-- 添加箭头标记定义 -->
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" class="fill-current text-blue-500" />
      </marker>
    </defs>
  </svg>
</template>

<script setup lang="ts">
// import {inject, onMounted, onUnmounted} from 'vue';
import {  ref } from 'vue';
import { CodeIcon} from 'lucide-vue-next';
import { userDarkMOdel } from '../../store/stateStore.ts'
import svg_android from '../../icons/android.svg';
import svg_arduino from '../../icons/arduino.svg';
import svg_html from '../../icons/html.svg';
import svg_linux from '../../icons/linux.svg';
import svg_mqtt from '../../icons/mqttx.svg';
import svg_spring from '../../icons/spring.svg';
import svg_vue from '../../icons/vue.svg';
import svg_tailwind from '../../icons/tailwindcss.svg';
import svg_typescript from '../../icons/typescript.svg';
import svg_supabase from '../../icons/supabase.svg'
import svg_vite from '../../icons/vite.svg'
import svg_python from '../../icons/python.svg'
const darkModeStore = userDarkMOdel();

//响应式数据
// 新增ref用于访问SVG容器，一个对DOM元素的引用
const svgContainer = ref<SVGSVGElement | null>(null);
// // 新增：存储技能元素的Map
// const skillElements = new Map<string, HTMLElement>();
// //用于存储当前所在的卡片(跟新箭头两端位置)
// const currentCard = ref<HTMLElement | null>(null);
// //储存当局project获取里面的tech
// const currentProject = ref<typeof projects.value[number] | null>(null);
// const isMouseInCard = ref<boolean>(false);

const projects = ref([
  {
    id: 1,
    title: 'Personal Web',
    description: 'Brain-computer interface visualization system',
    image: '/src/components/png_praises/Web_.png',
    tech: ['Vue.js', 'Typescript'],
    icon: [svg_vue, svg_tailwind, svg_typescript, svg_supabase]
  },
  {
    id: 2,
    title: 'AI_IOT_APP System',
    description: 'Next-generation operating system interface',
    image: '/src/components/png_praises/Iot_5.png',
    tech: ['MQTT', 'Esp8266/32', 'Arudino', 'Android', 'java', 'C++'],
    icon: [svg_mqtt, svg_arduino, svg_android, svg_spring, svg_vue]
  },
]);

const TECH_STACK = [
  {
    title: 'softWear',
    frontend: [
      {
        skill: 'Vue + Vite + Tailwind',
        icons: svg_vite,
        level: 70,
        color: 'bg-green-500'
      },
      {
        skill: 'HTML + CSS + JS',
        icons: svg_html,
        level: 80,
        color: 'bg-blue-500'
      },
      {
        skill: 'android + java',
        icons: svg_android,
        level: 85,
        color: 'bg-purple-500'
      }
    ],
    backend: [
      {
        skill: 'springboot',
        icons: svg_spring,
        level: 30,
        color: 'bg-pink-500'
      }
    ],
  },
  {
    title: 'hardWear',
    hardWear: [
      {
        skill: 'arduino + esp8266/32',
        icons: svg_arduino,
        level: 55
      },
      {
        skill: 'micropython + opencv',
        icons: svg_python,
        level: 40
      },
      {
        skill: 'linux',
        icons: svg_linux,
        level: 40
      },
    ]
  }
]

// //SVG图标
// const SvgIcon = ref(ChevronRight);
// // 12张卡片的响应式数据
// const praises = ref(Array.from({ length: 12 }, (_, i) => ({
//   id: i + 1,
//   image: `/src/components/png_praises/${i + 1}.jpg`,
// })));

// //颜色生成器
// const generateGradient = (index: number): string => {
//   const hue = (index * 137.508) % 360//黄金角分布
//   return `hsl(${hue},70%,50%)`
// }

// //计算元素中心点 
// const GetCenter = (el: HTMLElement): { x: number, y: number } => {
//   const rect = el.getBoundingClientRect();
//   return {
//     x: rect.left + rect.width / 2,
//     y: rect.top + rect.height / 2
//   }
// }
// //由于 projects 是一个 Ref，需要解包其值所以传进来不是project:typeof projects
// const showArrows = (project: typeof projects.value[number]) => {
//   //svgContainer.value 之前，确保它已经被正确赋值
//   //svgContainer.value 是一个 ref，TypeScript 提示它可能为 undefined，
//   // 因为 ref 的初始值是 undefined，直到组件挂载时才会被赋值。
//   if (!svgContainer.value) return;
//   isMouseInCard.value = true;
//   // 清空之前的箭头
//   svgContainer.value.innerHTML = '';
//   const projectCard = event?.currentTarget as HTMLElement;
//   const startPoint = GetCenter(projectCard);
//   //备份储存，用于滚动更新
//   currentCard.value = projectCard;
//   currentProject.value = project;

//   (project.tech).forEach((tech: string, index: number) => {
//     const skillEL = skillElements.get(tech);
//     //如果元素未找到
//     if (!skillEL) return;
//     const endPoint = GetCenter(skillEL);
//     const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//     line.setAttribute('x1', String(startPoint.x));
//     line.setAttribute('y1', String(startPoint.y));
//     line.setAttribute('x2', String(endPoint.x));
//     line.setAttribute('y2', String(endPoint.y));
//     line.setAttribute('stroke', generateGradient(index)); // 使用动态颜色
//     line.setAttribute('stroke-width', '2');
//     line.setAttribute('marker-end', 'url(#arrowhead)'); // 添加箭头头部
//     // 添加动画效果
//     line.style.transition = 'all 0.5s ease';
//     if (svgContainer.value) {
//       svgContainer.value.appendChild(line);
//     }
//   });
// };

// // 新增：鼠标移出时隐藏箭头
// const hideArrows = () => {
//   if (svgContainer.value) {
//     svgContainer.value.innerHTML = '';
//   }
//   isMouseInCard.value = false;
// };


// // 计算每张卡片的位置和旋转角度，以创建一个120度的扇形效果
// const getFanPosition = (index: number) => {
//   const radius = 300; // 卡片到中心点的距离
//   const startAngle = -60; // 扇形的起始角度
//   const totalAngle = 120; // 扇形的总角度范围
//   const angleStep = totalAngle / praises.value.length; // 每张卡片的角度间隔
//   const angle = angleStep * index + startAngle; // 当前卡片的角度
//   const x = radius * Math.cos((angle * Math.PI) / 180); // 计算X坐标
//   const y = radius * Math.sin((angle * Math.PI) / 180); // 计算Y坐标
//   const rotationAngle = angle + 90; // 调整旋转角度，使卡片面向外侧

//   return `
//     transform: translate(${x}px, ${y}px) rotate(${rotationAngle}deg);
//     left: 45%;
//     top: 45%;
//     rotate: -90deg;
//   `;
// }


// const updateArrows = () => {
//   if (isMouseInCard.value === true) {
//     // 检查 svgContainer 和 currentCard 是否已经赋值，如果没有赋值则直接返回
//     if (!svgContainer.value || !currentCard.value) return;
//     // 清空 svgContainer 中的所有内容，以便重新绘制箭头
//     svgContainer.value.innerHTML = '';
//     const startPoint = GetCenter(currentCard.value);
//     const project = currentProject.value;
//     if (!project) return;
//     // 遍历每个项目
//     (project.tech).forEach((tech: string, index: number) => {
//       // 从 skillElements Map 中获取对应技术栈的 DOM 元素
//       const skillEL = skillElements.get(tech);
//       // 如果找不到对应的 DOM 元素，则跳过当前循环
//       if (!skillEL) return;
//       // 获取技能元素的中心点坐标
//       const endPoint = GetCenter(skillEL);
//       // 创建一个新的 SVG 线条元素
//       const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//       // 设置线条的起点坐标 (x1, y1)
//       line.setAttribute('x1', String(startPoint.x));
//       line.setAttribute('y1', String(startPoint.y));
//       // 设置线条的终点坐标 (x2, y2)
//       line.setAttribute('x2', String(endPoint.x));
//       line.setAttribute('y2', String(endPoint.y));
//       // 设置线条的颜色，使用动态生成的颜色
//       line.setAttribute('stroke', generateGradient(index));
//       // 设置线条的宽度
//       line.setAttribute('stroke-width', '2');
//       // 设置线条的箭头头部
//       line.setAttribute('marker-end', 'url(#arrowhead)');
//       // 添加过渡效果
//       line.style.transition = 'all 0.5s ease';
//       if (svgContainer.value) {
//         svgContainer.value.appendChild(line);
//       }
//     });
//   }
// };

// // 将点击的卡片移动到数组的末尾
// const moveToFirst = (index: number) => {
//   if (index >= praises.value.length) return;

//   const newArr = [...praises.value]; // 创建数组的浅拷贝
//   const [item] = newArr.splice(index, 1); // 从原位置移除卡片
//   newArr.push(item); // 将卡片添加到数组末尾
//   praises.value = newArr; // 更新响应式数据
// };

// onUnmounted(() => {
//   hideArrows()
//   window.removeEventListener('scroll', () => {
//     updateArrows();
//   });
// });

// onMounted(() => {
//   window.addEventListener('scroll', () => {
//     updateArrows();
//   });
// })




</script>

<style scoped>
.poker {
  position: absolute;
  width: 20rem;
  height: 26rem;
  border: 2px solid black;
  border-radius: 1.5rem;
  overflow: hidden;
  transform-origin: bottom left;
  transition: transform 0.3s ease, left 0.3s ease, top 0.3s ease;
}
</style>