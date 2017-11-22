import appService from "../../services/comments.service";

const actions = {
  getItems(context) {
    context.state.comments = [];
    appService.getItems({ page: 1 }).then(payload => {
      context.commit("loadItems", payload.data);
    });
  },
  updateStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("loadItems", payload.data);
      actions.getItems(context);
    });
  },
  updateItem(context, comment) {
    appService.updateItem(comment).then(payload => {
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
