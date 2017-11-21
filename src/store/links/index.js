import actions from "./actions";
import mutations from "./mutations";

const state = {
  links: [],
  filter: {
    categories: [],
    tags: [],
    users: []
  },
  selected: {
    category: "",
    tag: "",
    name: ""
  }
};

const getters = {
  links: state => {
    return state.links;
  },
  filter: state => {
    return state.filter;
  },
  selected: state => {
    return state.selected;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
