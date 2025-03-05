<template>
  <div class="min-h-screen p-8">
    <!-- 主要内容 -->
    <div class="relative z-10">
      <article class="mx-auto max-w-4xl">
        <!-- 文章头部 -->
        <header class="mb-8 text-center">
          <h1 class="mb-4 text-4xl font-bold text-white">{{ post.title }}</h1>
          <div class="flex items-center justify-center gap-4 text-gray-400">
            <span>{{ post.date }}</span>
            <span>by:{{ post.author }}</span>
          </div>
        </header>

        <!-- 文章内容 -->
        <div class="prose prose-invert max-w-none rounded-xl backdrop-blur-sm bg-white/5 p-6 lg:p-8">
          <div class="markdown-body" v-html="renderedContent"></div>
        </div>

        <!-- 评论区 
        <div class="mt-12">
          <h2 class="mb-6 text-2xl font-bold text-white">评论</h2>
          <div class="mb-8 rounded-xl backdrop-blur-sm bg-white/5 p-6">
            <textarea v-model="newComment" rows="4"
              class="mb-4 w-full rounded-lg border border-gray-700 bg-zinc-800/50 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
              placeholder="写下你的评论..."></textarea>
            <button @click="submitComment"
              class="rounded-lg bg-purple-500 px-6 py-2 text-white transition-all hover:bg-purple-600 hover:scale-105 active:scale-95">
              发表评论
            </button>
          </div>

          <div class="space-y-6">
            <div v-for="comment in comments" :key="comment.id" class="rounded-xl backdrop-blur-sm bg-white/5 p-6">
              <div class="mb-2 flex items-center gap-3">
                <div class="h-10 w-10 overflow-hidden rounded-full bg-purple-500/20">
                  <img :src="`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`" alt="avatar"
                    class="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 class="font-medium text-white">{{ comment.author }}</h3>
                  <p class="text-sm text-gray-400">{{ comment.date }}</p>
                </div>
              </div>
              <p class="text-gray-300">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        -->
      </article>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import 'prismjs' // 导入 Prism.js
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

// Markdown 解析器配置
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (Prism.languages[lang]) {
      return (
        '<pre class="language-' +
        lang +
        '">' +
        Prism.highlight(str, Prism.languages[lang], lang) +
        '</pre>'
      );
    } else {
      return (
        '<pre class="language-text">' +
        Prism.highlight(str, Prism.languages['markup'], 'text') +
        '</pre>'
      );
    }
  },
});

// 文章数据
const post = ref({
  title: 'coding.....👻',
  date: '2024-02-19',
  author: 'RSRR',
  content: `
  # ..
  
  
  ## So long cowboy you're so cool
  
  cash in hand with memory of you
  
  \`\`\`javascript
  import { 🍍 } from '🛸'
  
  export default {
    setup() {
      return { ♥️ }
    }
  }
    `,

  //   \`\`\`
  // ## TypeScript 支持
  // 提供了一流的 TypeScript 支持：
  // \`\`\`typescript
  // interface User {
  //   id: number
  //   name: string
  // }
  // const user = ref<User>({
  //   id: 1,
  //   name: '123',
  // })
  // \`\`\`
})
// 评论数据
const comments = ref([
  {
    id: 1,
    author: '自行车自行车',
    content: '啊八八八八',
    date: '2024-02-19 14:30',
  },
])
const newComment = ref('')
// 渲染的 Markdown 内容
const renderedContent = ref('')
// 提交评论
const submitComment = () => {
  if (!newComment.value.trim()) {
    alert('请输入评论内容')
    return
  }

  comments.value.unshift({
    id: Date.now(),
    author: '访客',
    content: newComment.value,
    date: new Date().toLocaleString(),
  })

  newComment.value = ''
}

// 渲染 Markdown
onMounted(() => {
  renderedContent.value = md.render(post.value.content)
})
</script>

<style scoped>
/* Markdown 样式 */
.markdown-body {
  color: #e4e4e7;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  color: white;
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.markdown-body a {
  color: #a855f7;
}

.markdown-body pre {
  background-color: #1e1e2e !important;
  border-radius: 0.5rem;
}

.markdown-body code {
  color: #e4e4e7;
  background-color: #1e1e2e;
  padding: 0.2em 0.4em;
  border-radius: 0.3em;
}

.markdown-body pre code {
  padding: 0;
}
</style>