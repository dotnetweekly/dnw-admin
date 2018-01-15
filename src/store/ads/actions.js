import appService from "../../services/ads.service";

const actions = {
  getList(context) {
    context.state.ads = [];
    appService.getList({ page: 1 }).then(payload => {
      context.commit("loadAds", payload.data);
    });
  },
  changeStatus(context, { ids, status }) {
    appService.updateStatus(ids, status).then(payload => {
      context.commit("loadAds", payload.data);
      actions.getList(context);
    });
  },
  updateAd(context, ad) {
    appService.updateAd(ad).then(payload => {
      if (payload.success) {
        context.commit("loadAds", payload.data);
        actions.getList(context);
        alert("Saved");
      }
    });
  },
  deleteItems(context, ids) {
    appService.deleteItems(ids).then(payload => {
      if (payload.success) {
        context.commit("loadAds", payload.data);
        actions.getList(context);
      }
    });
  }
};

export default actions;
