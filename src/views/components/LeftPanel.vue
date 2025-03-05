<template>
    <!-- 修改后的侧边栏容器 -->
    <div class="h-full fixed duration-300 rounded-lg  p-2"
        :class="[slideBarExtendStore.leftBarExtend ? 'w-[250px]' : 'w-[50px]',]">
        <!-- 折叠按钮 -->
        <div class="flex h-10 items-center p-2" :class="{ 'justify-end': slideBarExtendStore.leftBarExtend }">
            <button @click="toggleSidebar" class="transform transition-transform duration-300 hover:scale-110" :class="[
                !slideBarExtendStore.leftBarExtend && 'rotate-180']">
                <PanelTopOpen class="w-5 h-5" />
            </button>
        </div>
        <!-- 折叠后的图标导航 -->
        <div class="p-2 space-y-4">
            <!--当用户点击 nav 元素时，会触发 emit 方法，发送一个名为 navClick 的事件，并传递当前 route 的 index 作为参数。-->
            <nav v-for="route in mainRoutes" class="flex items-center p-2 rounded-lg   group "
                @click="setIndex(route.index)" :class="[
                    route.index === CurrentPageStore.currentIndex ? 'bg-gray-300/40' :
                        darkModeStore.isDark ? 'hover:bg-zinc-700/30' : 'hover:bg-gray-400',
                    slideBarExtendStore.leftBarExtend ? 'justify-start' : 'justify-center'
                ]">
                <component :is="route.icon" class="w-5 h-5 shrink-0" />
                <span v-show="slideBarExtendStore.leftBarExtend"
                    class="ml-2 text-sm truncate transition-opacity duration-300">
                    {{ route.name }}
                </span>
                <span v-if="!slideBarExtendStore.leftBarExtend"
                    class="absolute left-full ml-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    :class="darkModeStore.isDark ? 'bg-zinc-700 text-white' : 'bg-gray-100 text-black'">
                    {{ route.name }}
                </span>
            </nav>
            <div class="p-4 border-t transition-colors"
                :class="darkModeStore.isDark ? 'border-zinc-700' : 'border-gray-200'">
            </div>
            <nav v-for="route in secondaryRoutes" class="flex items-center p-2 rounded-lg   group "
                @click="routeToPage(route)"
                :class="slideBarExtendStore.leftBarExtend ? 'justify-start' : 'justify-center'">
                <component :is="route.icon" class="w-5 h-5 shrink-0" />
                <span v-show="slideBarExtendStore.leftBarExtend"
                    class="ml-2 text-sm truncate transition-opacity duration-300">
                    {{ route.name }}
                </span>
                <span v-if="!slideBarExtendStore.leftBarExtend"
                    class="absolute left-full ml-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {{ route.name }}
                </span>
            </nav>
        </div>

        <!-- 折叠时隐藏的内容 -->
        <div v-if="slideBarExtendStore.leftBarExtend">
            <!-- 系统状态监控 -->
            <div class="p-4 border-t transition-colors"
                :class="darkModeStore.isDark ? 'border-zinc-700' : 'border-gray-200'">
                <div class="space-y-4">
                    <div class="p-3 rounded-lg transition-colors">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs">SYSTEM
                                STATUS</span>
                            <span class="flex items-center gap-2 text-xs">
                                <span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                ONLINE
                            </span>
                        </div>
                        <div class="space-y-2">
                            <div v-for="(stat, index) in systemStats" :key="index">
                                <div class="flex justify-between text-xs mb-1">
                                    <span>{{ stat.name }}</span>
                                    <span>{{ stat.value }}%</span>
                                </div>
                                <div class="h-1 rounded-full overflow-hidden"
                                    :class="darkModeStore.isDark ? 'bg-zinc-700' : 'bg-gray-200'">
                                    <div class="h-full   duration-500 rounded-full" :class="stat.color"
                                        :style="{ width: `${stat.value}%` }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//暗色模式处理

import { userDarkMOdel, userCurrentPage, userSlideBarExtend } from '../../store/stateStore'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

// 在<script setup>中注册组件
defineOptions({
    components: { Carousel, Slide }
})

const darkModeStore = userDarkMOdel()
const CurrentPageStore = userCurrentPage()
const slideBarExtendStore = userSlideBarExtend()
//取出来的是一个对象，里面有一个isDark属性

import {
    CodeIcon, HeartIcon, PanelTopOpen, Music,
    MessageSquareDiff, Cpu
} from 'lucide-vue-next'

const toggleSidebar = () => {
    slideBarExtendStore.leftBarExtend = !slideBarExtendStore.leftBarExtend
}

// 路由配置
const mainRoutes = [ // 主要路由
    {
        index: 1,
        name: 'TECH_MATRIX',
        icon: CodeIcon
    },
    {
        index: 2,
        name: 'LIFE_STREAM',
        icon: HeartIcon
    },
    {
        index: 3,
        name: 'MUSIC',
        icon: Music
    }
]
const secondaryRoutes = [
    {
        index: 1,
        name: 'messagePage',
        icon: MessageSquareDiff,
        path: '/messagePage'
    },
    {
        index: 2,
        name: 'blogPage',
        icon: Cpu,
        path: '/blogPage'
    }
]
const setIndex = (newIndex: number) => {
    CurrentPageStore.currentIndex = newIndex;
    console.log(CurrentPageStore.currentIndex)
}

const routeToPage = (route: typeof secondaryRoutes[number]) => {
    //实现完全跳转
    window.location.href = route.path
}

// 系统状态数据
const systemStats = ref([ // 系统状态数据
    {
        name: 'CPU LOAD',
        value: 45,
        color: 'bg-blue-500' // CPU 负载进度条颜色
    },
    {
        name: 'MEMORY',
        value: 72,
        color: 'bg-purple-500' // 内存使用进度条颜色
    },
    {
        name: 'NETWORK',
        value: 89,
        color: 'bg-green-500' // 网络状态进度条颜色
    }
])
// 模拟系统状态数据变化
setInterval(() => {
    systemStats.value = systemStats.value.map(stat => ({
        ...stat,
        value: Math.floor(Math.random() * 100) // 随机生成新的状态值
    }))
}, 3000) // 每3秒更新一次系统状态数据
</script>

<style scoped>
/* 工具提示动画 */
.group:hover span {
    transform: translateX(0);
    opacity: 1;
}
</style>
