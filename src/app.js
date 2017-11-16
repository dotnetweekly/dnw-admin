import Vue from "vue";
import store from "./store/index.js";
import AppLayout from "./theme/Layout.vue";
import router from "./router";

import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.api.local;

axios.interceptors.request.use(function(config) {
  if (typeof window === "undefined") {
    return config;
  }
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(undefined, err => {
  let res = err.response;
  if (res.status === 401 || (res.body && !res.body.success)) {
    return Promise.reject(error);
  }
});

const app = new Vue({
  router,
  ...AppLayout,
  store
});

export { app, router, store };
