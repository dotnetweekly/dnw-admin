import actions from "./actions";
import mutations from "./mutations";

const state = {
  users: []
};

const getters = {
  users: state => {
    return state.users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
