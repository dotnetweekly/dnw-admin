const mutations = {
  loadItems(state, params) {
    state.users = params.items;
    state.page = params.page;
    state.pages = params.pages;
  }
};

export default mutations;
