import actions from "./actions";
import mutations from "./mutations";

const state = {
  tags: []
};

const getters = {
  tags: state => {
    return state.tags;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
