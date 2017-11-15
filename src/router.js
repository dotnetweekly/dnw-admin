import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => System.import("./pages/Login.vue");
const NotFound = () => System.import("./theme/NotFound.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    { path: "/login", component: Login },
    { path: "*", component: NotFound }
  ]
});

export default router;
