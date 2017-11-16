import appService from "../../services/categories.service";

const actions = {
  getList(context) {
    appService.getList({ page: 1 }).then(payload => {
      context.commit("loadCategories", payload.data);
    });
  }
};

export default actions;
