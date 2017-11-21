import appService from "../../services/links.service";

const actions = {
  getList(context) {
    appService.getList({ page: 1 }).then(payload => {
      context.commit("linksFound", payload.data);
    });
  },
  updateStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("linksFound", payload.data);
      actions.getList(context);
    });
  },
  updateLink(context, category) {
    appService.updateLink(category).then(payload => {
      if (payload.success) {
        context.commit("linksFound", payload.data);
        actions.getList(context);
        alert("Saved");
      }
    });
  },
  deleteItems(context, ids) {
    console.log(ids);
    appService.deleteItems(ids).then(payload => {
      if (payload.success) {
        context.commit("linksFound", payload.data);
        actions.getList(context);
      }
    });
  }
};

export default actions;
