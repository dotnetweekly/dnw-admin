import actions from "./actions";
import mutations from "./mutations";

const state = {
  users: [],
  page: 1,
  pages: 1
};

const getters = {
  users: state => {
    return state.users;
  },
  page: state => {
    return state.page;
  },
  pages: state => {
    return state.pages;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
