<template>
  <section v-if="darkModeStore.isDark" class="p-4 z-50">
    <div class="flex gap-4">
      <a v-for="tech in IconAndUrl" :key="tech.name" :href="tech.url" class="hover:text-white" :title="tech.name">
        <component :is="tech.icon" class="w-6 h-6" />
      </a>
      <button @click="toggleTheme">
        <MoonIcon v-if="darkModeStore.isDark" class="w-6 h-6 hover:text-white" />
        <SunIcon v-else class="w-6 h-6 hover:text-white" />
      </button>
    </div>
  </section>
  <section v-else class="p-4">
    <div class="flex gap-4">
      <a v-for="tech in IconAndUrl" :key="tech.name" :href="tech.url" class="hover:text-white" :title="tech.name">
        <component :is="tech.icon" class="w-6 h-6" />
      </a>
      <button @click="toggleTheme">
        <MoonIcon v-if="darkModeStore.isDark" class="w-6 h-6 hover:text-white" />
        <SunIcon v-else class="w-6 h-6 hover:text-white" />
      </button>
    </div>
  </section>
  <div class="relative p-4 rounded-full w-30">
    <div class="relative flex justify-between h-10">
      <div class="flex-1 flex items-center justify-center cursor-pointer z-10" @click="switchLanguage('zh')">
        <span :class="activeLang === 'zh' ? 'text-white' : 'text-gray-500'">
          中文
        </span>
      </div>
      <div class="flex-1 flex items-center justify-center cursor-pointer z-10" @click="switchLanguage('en')">
        <span :class="activeLang === 'en' ? 'text-white' : 'text-gray-500'">
          EN
        </span>
      </div>
      <div class="flex-1 flex items-center justify-center cursor-pointer z-10" @click="switchLanguage('ja')">
        <span :class="activeLang === 'ja' ? 'text-white' : 'text-gray-500'">
          日本語
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userDarkMOdel } from '../../store/stateStore'
import { ref } from 'vue'
import { i18n } from '../../utils/18n'
import {
  SunIcon, MoonIcon,
  GithubIcon, Tv
} from 'lucide-vue-next'

const activeLang = ref('zh')


const darkModeStore = userDarkMOdel()

function toggleTheme() {
  darkModeStore.toggleDarkModel()
}

const IconAndUrl = [
  { name: 'GitHub', icon: GithubIcon, url: "https://github.com/ssr6wu6ho" },
  { name: 'bilibili', icon: Tv, url: "https://space.bilibili.com/34321318" },
]

// 封装语言切换逻辑
function switchLanguage(lang: 'zh' | 'en' | 'ja') {
  activeLang.value = lang
  i18n.global.locale.value = lang
}
</script>

<style scoped></style>