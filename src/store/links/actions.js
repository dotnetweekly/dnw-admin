import appService from "../../services/links.service";

const actions = {
  getList(context) {
    appService.getList({ page: 1 }).then(payload => {
      context.commit("linksFound", payload.data);
    });
  }
};

export default actions;
