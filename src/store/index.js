import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth";
import linksModule from "./links";
import categoriesModule from "./categories";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authModule,
    linksModule,
    categoriesModule
  }
});

export default store;
