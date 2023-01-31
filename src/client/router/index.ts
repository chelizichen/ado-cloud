import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
let routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "/server",
    component: () => import("@/pages/server/index.vue"),
  },
  {
    path: "/relevance",
    component: () => import("@/pages/relevance/index.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
