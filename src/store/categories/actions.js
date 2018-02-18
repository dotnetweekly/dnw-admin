import appService from "../../services/categories.service";

const actions = {
  getList(context) {
    context.state.categories = [];
    appService.getList({ page: 1 }).then(payload => {
      context.commit("loadCategories", payload.data);
    });
  },
  changeStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("loadCategories", payload.data);
      actions.getList(context);
    });
  },
  updateCategory(context, category) {
    appService.updateCategory(category).then(payload => {
      if (payload.success) {
        context.commit("loadCategories", payload.data);
        actions.getList(context);
        alert("Saved");
      }
    });
  },
  deleteItems(context, ids) {
    appService.deleteItems(ids).then(payload => {
      if (payload.success) {
        context.commit("loadCategories", payload.data);
        actions.getList(context);
      }
    });
  }
};

export default actions;
