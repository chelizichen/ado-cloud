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
    path: "/log",
    component: () => import("@/pages/log/index.vue"),
    children: [
      {
        path: ":serverName",
        component: () => import("@/pages/log/server.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/pages/user/index.vue"),
  },
  {
    path: "/manage",
    component: () => import("@/pages/manage/index.vue"),
    children: [
      {
        path: "user",
        component: () => import("@/manage/user/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
