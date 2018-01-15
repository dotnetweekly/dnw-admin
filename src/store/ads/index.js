import actions from "./actions";
import mutations from "./mutations";

const state = {
  ads: []
};

const getters = {
  ads: state => {
    return state.ads;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
