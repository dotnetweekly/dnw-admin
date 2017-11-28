import appService from "../../services/comments.service";

const actions = {
  getItems(context, { id }) {
    context.state.comments = [];
    appService.getItems({ link: id }).then(payload => {
      context.commit("loadItems", payload.data);
    });
  },
  updateStatus(context, { ids, status, link }) {
    appService.updateStatus({ ids, status, link }).then(payload => {
      actions.getItems(context, { id: link });
    });
  },
  updateItem(context, { link, item }) {
    appService.updateItem({ link, item }).then(payload => {
      if (payload.success) {
        actions.getItems(context, { id: link });
      }
    });
  },
  deleteItems(context, { ids, link }) {
    appService.deleteItems({ ids, link }).then(payload => {
      if (payload.success) {
        actions.getItems(context, { id: link });
      }
    });
  }
};

export default actions;
