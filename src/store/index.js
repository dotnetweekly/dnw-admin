import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth";
import linksModule from "./links";
import categoriesModule from "./categories";
import tagsModule from "./tags";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authModule,
    linksModule,
    categoriesModule,
    tagsModule
  }
});

export default store;
