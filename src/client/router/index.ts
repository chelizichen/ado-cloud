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
    path: "/user",
    component: () => import("@/pages/user/index.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
