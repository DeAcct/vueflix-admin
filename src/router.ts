import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "대시보드",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 대시보드",
      appBar: true,
      bottomTabMenu: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "vueflix-active-link",
});
