import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "대시보드",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 대시보드",
      header: true,
      requiresAuth: true,
    },
  },
  {
    path: "/anime",
    name: "애니메이션",
    component: () => import("@/views/Anime.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 애니메이션",
      header: true,
      requiresAuth: true,
    },
  },
  {
    path: "/recommend-list",
    name: "추천 목록",
    component: () => import("@/views/RecommendList.vue"),
    meta: {
      title: "뷰플릭스 어드민 - 추천 목록",
      header: true,
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "검색",
    component: () => import("@/views/Search.vue"),
    meta: {
      title: "검색",
      header: true,
      requiresAuth: true,
    },
  },
  {
    path: "/anime-detail/:title",
    name: "상세페이지",
    component: () => import("@/views/AnimeDetail.vue"),
    meta: {
      header: true,
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "로그인",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "로그인",
      header: false,
    },
  },
  {
    path: "/not-found",
    name: "존재하지 않는 메뉴",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "슈뢰딩거의 메뉴",
      header: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not-found",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "vueflix-active-link",
});
