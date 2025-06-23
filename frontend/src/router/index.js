import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";
import TicketList from "../views/TicketList.vue";
import TicketDetail from "../views/TicketDetail.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "TicketList",
    component: TicketList,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id",
    name: "TicketDetail",
    component: TicketDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
