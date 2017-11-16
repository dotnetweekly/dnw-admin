import actions from "./actions";
import mutations from "./mutations";

const state = {
  categories: []
};

const getters = {
  categories: state => {
    return state.categories;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
