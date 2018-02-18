import appService from "../../services/users.service";

const actions = {
  getItems(context, params) {
    context.state.users = [];
    appService.getItems({ page: params.page }).then(payload => {
      context.commit("loadItems", payload.data);
    });
  },
  updateStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("loadItems", payload.data);
      actions.getItems(context);
    });
  },
  updateItem(context, item) {
    appService.updateItem(item).then(payload => {
      if (payload.success) {
        context.commit("loadItems", payload.data);
        actions.getItems(context);
        alert("Saved");
      }
    });
  },
  deleteItems(context, ids) {
    appService.deleteItems(ids).then(payload => {
      if (payload.success) {
        context.commit("loadItems", payload.data);
        actions.getItems(context);
      }
    });
  }
};

export default actions;
