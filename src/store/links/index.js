import actions from "./actions";
import mutations from "./mutations";

const state = {
  links: [],
  filters: {
    categories: [],
    tags: []
  }
};

const getters = {
  links: state => {
    return state.links;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
