import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => System.import("./pages/Login.vue");

const Categories = () => System.import("./pages/Categories/CategoryList.vue");
const CategoryEdit = () => System.import("./pages/Categories/CategoryEdit.vue");

const Links = () => System.import("./pages/Links/LinkList.vue");
const LinkAdd = () => System.import("./pages/Links/LinkAdd.vue");

const NotFound = () => System.import("./theme/NotFound.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    { path: "/categories", component: Categories },
    { path: "/categories/add", component: CategoryEdit },
    { path: "/links", component: Links },
    { path: "/links/add", component: LinkAdd },
    { path: "/login", component: Login },
    { path: "*", component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  let expiration = window.localStorage.getItem("tokenExpiration");
  var unixTimestamp = new Date().getTime() / 1000;
  if (
    (expiration === null ||
      expiration === "null" ||
      parseInt(expiration) - unixTimestamp < 0) &&
    to.path !== "/login"
  ) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
