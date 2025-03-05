<template>
    <!-- срио╫г -->
    <div class=" p-4 z-50   " @mouseover="handleMouseOver" @mouseout="handleMouseOut">
        <div class="flex gap-4">
            <a v-for="tech in techStack" :key="tech.name" :href="tech.link"
                class=" hover:text-white  " :class="[slideBarExtendStore.rightTopBarExtend ? 'flex' : 'hidden']"
                :title="tech.name">
                <component :is="tech.icon" class="w-6 h-6" />
            </a>
            <ChevronRight class="flex w-6 h-6 rotate-180" v-show="!slideBarExtendStore.rightTopBarExtend"></ChevronRight>
            <button @click="toggleTheme">
                <MoonIcon v-if="darkModeStore.isDark" class="w-6 h-6 hover:text-white" />
                <SunIcon v-else class="w-6 h-6 hover:text-white" />
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { userDarkMOdel, userSlideBarExtend } from '../../store/stateStore'
import {
    SunIcon, MoonIcon, ChevronRight,
    GithubIcon, Tv, MessageCircleMore
} from 'lucide-vue-next'


const darkModeStore = userDarkMOdel()
const slideBarExtendStore = userSlideBarExtend()

function toggleTheme() {
    darkModeStore.toggleDarkModel()
}
const handleMouseOver = () => {
    slideBarExtendStore.rightTopBarExtend = true
}
const handleMouseOut = () => {
    slideBarExtendStore.rightTopBarExtend = false
}

const techStack = [
    { name: 'GitHub', icon: GithubIcon, link: '#' },
    { name: 'bilibili', icon: Tv, link: '#' },
    { name: 'MessageCircleMore', icon: MessageCircleMore, link: '#' }
]
</script>

<style scoped>

</style>
