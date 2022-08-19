import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "대시보드",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 대시보드",
    },
  },
  {
    path: "/anime",
    name: "애니메이션",
    component: () => import("@/views/Anime.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 애니메이션",
    },
  },
  {
    path: "/recommend-list",
    name: "추천 목록",
    component: () => import("@/views/RecommendList.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 추천 목록",
    },
  },
  {
    path: "/search",
    name: "검색",
    component: () => import("@/views/Search.vue"),
    meta: {
      title: "검색",
    },
    props: true,
  },
  {
    path: "/anime-detail/:title",
    name: "상세페이지",
    component: () => import("@/views/AnimeDetail.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "vueflix-active-link",
});
