import actions from "./actions";
import mutations from "./mutations";

const state = {
  comments: []
};

const getters = {
  comments: state => {
    return state.comments;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
