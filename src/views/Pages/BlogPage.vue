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
      </article>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { userBlogPage } from '../../store/stateStore.ts';
import MarkdownIt from 'markdown-it'
import 'prismjs' // 导入 Prism.js
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

const blogPageStore = userBlogPage();

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
})


const post_2 = ref({
  title: '👻',
  date: '2024-02-19',
  author: 'sss',
  content: `
  # ..
  
  
  ## So lonsc
  
  \`\`\`javascript
  import { 🍍 } from '🛸'
  
  export default {
    setup() {
      return { ♥️ }
    }
  }
    `,
})


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
  if (blogPageStore.blogPage===1) { renderedContent.value = md.render(post.value.content) }
  else if (blogPageStore.blogPage===2) { renderedContent.value = md.render(post_2.value.content) }
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