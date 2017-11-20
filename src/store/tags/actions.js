import appService from "../../services/tags.service";

const actions = {
  getItems(context) {
    context.state.tags = [];
    appService.getItems({ page: 1 }).then(payload => {
      context.commit("loadTags", payload.data);
    });
  },
  updateStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("loadTags", payload.data);
      actions.getItems(context);
    });
  },
  updateItem(context, tag) {
    appService.updateItem(tag).then(payload => {
      if (payload.success) {
        context.commit("loadTags", payload.data);
        actions.getItems(context);
        alert("Saved");
      }
    });
  },
  deleteItems(context, ids) {
    appService.deleteItems(ids).then(payload => {
      if (payload.success) {
        context.commit("loadTags", payload.data);
        actions.getItems(context);
      }
    });
  }
};

export default actions;
