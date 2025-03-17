<template>
    <div class=" p-4 z-50">
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
