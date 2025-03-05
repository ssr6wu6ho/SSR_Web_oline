import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/messagePage",
    name: "messagePage",
    component: () => import("../views/Pages/MessagePage.vue"),
  },
  {
    path: "/blogPage",
    name: "blogPage",
    component: () => import("../views/Pages/BlogPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  //确保每次路由切换时页面滚动到顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
