import actions from "./actions";
import mutations from "./mutations";

const state = {
  newsletters: []
};

const getters = {
  newsletters: state => {
    return state.newsletters;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
