<template>
    <section v-if="darkModeStore.isDark" class=" p-4 z-50">
        <div class="flex gap-4">
            <a v-for="tech in IconAndUrl" :key="tech.name" :href="tech.url" class=" hover:text-white  "
                :title="tech.name">
                <component :is="tech.icon" class="w-6 h-6" />
            </a>
            <button @click="toggleTheme">
                <MoonIcon v-if="darkModeStore.isDark" class="w-6 h-6 hover:text-white" />
                <SunIcon v-else class="w-6 h-6 hover:text-white" />
            </button>
        </div>
    </section>

    
    <section v-else class=" p-4 z-50">
        <div class="flex gap-4">
            <a v-for="tech in IconAndUrl" :key="tech.name" :href="tech.url" class=" hover:text-white  "
                :title="tech.name">
                <component :is="tech.icon" class="w-6 h-6" />
            </a>
            <button @click="toggleTheme">
                <MoonIcon v-if="darkModeStore.isDark" class="w-6 h-6 hover:text-white" />
                <SunIcon v-else class="w-6 h-6 hover:text-white" />
            </button>
        </div>
      
    </section>
    <div class="relative p-2 bg-gray-100 rounded-full w-80">
    <!-- 滑动背景 -->
    <div 
      class="absolute h-10 bg-blue-500 rounded-full transition-all duration-300 w-1/3"
      :class="{
        'left-2': activeLang === 'zh',
        'left-1/3 translate-x-2': activeLang === 'en',
        'left-2/3 translate-x-4': activeLang === 'ja'
      }"
    ></div>
    
    <div class="relative flex justify-between h-10">
      <!-- 中文选项 -->
      <div
        class="flex-1 flex items-center justify-center cursor-pointer z-10"
        @click="activeLang = 'zh'"
      >
        <span :class="activeLang === 'zh' ? 'text-white' : 'text-gray-500'">
          中文
        </span>
      </div>

      <!-- 英文选项 -->
      <div
        class="flex-1 flex items-center justify-center cursor-pointer z-10"
        @click="activeLang = 'en'"
      >
        <span :class="activeLang === 'en' ? 'text-white' : 'text-gray-500'">
          EN
        </span>
      </div>

      <!-- 日文选项 -->
      <div
        class="flex-1 flex items-center justify-center cursor-pointer z-10"
        @click="activeLang = 'ja'"
      >
        <span :class="activeLang === 'ja' ? 'text-white' : 'text-gray-500'">
          日本語
        </span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { userDarkMOdel } from '../../store/stateStore'
import {
    SunIcon, MoonIcon,
    GithubIcon, Tv
} from 'lucide-vue-next'


const darkModeStore = userDarkMOdel()

function toggleTheme() {
    darkModeStore.toggleDarkModel()
}

const IconAndUrl = [
    { name: 'GitHub', icon: GithubIcon, url: "https://github.com/ssr6wu6ho" },
    { name: 'bilibili', icon: Tv, url: "https://space.bilibili.com/34321318" },
]
</script>

<style scoped></style>
