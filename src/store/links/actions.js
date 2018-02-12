import appService from "../../services/links.service";
import categoryService from "../../services/categories.service";
import tagService from "../../services/tags.service";

const actions = {
  getList(context, params) {
    appService.getList(context.state.selected).then(payload => {
      context.commit("linksFound", payload.data);
    });
  },
  updateStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("linksFound", payload.data);
      actions.getList(context);
    });
  },
  updateItem(context, category) {
    appService.updateItem(category).then(payload => {
      if (payload.success) {
        context.commit("linksFound", payload.data);
        actions.getList(context);
        alert("Saved");
      }
    });
  },
  deleteItems(context, ids) {
    appService.deleteItems(ids).then(payload => {
      if (payload.success) {
        context.commit("linksFound", payload.data);
        actions.getList(context);
      }
    });
  },
  loadFilters(context) {
    categoryService.getList().then(payload => {
      context.state.filter.categories = payload.data;
    })

    tagService.getItems().then(payload => {
      context.state.filter.tags = payload.data;
    })
  }
};

export default actions;
