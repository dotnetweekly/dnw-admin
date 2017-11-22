import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth";
import linksModule from "./links";
import categoriesModule from "./categories";
import tagsModule from "./tags";
import usersModule from "./users";
import newslettersModule from "./newsletters";
import commentsModule from "./comments";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authModule,
    linksModule,
    categoriesModule,
    tagsModule,
    usersModule,
    newslettersModule,
    commentsModule
  }
});

export default store;
