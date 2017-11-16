import appService from "../../services/auth.service";

const actions = {
  logout(context) {
    context.commit("logout");
  },
  login(context, credentials) {
    return new Promise(resolve => {
      appService
        .login(credentials)
        .then(data => {
          context.commit("login", data.data);

          resolve();
        })
        .catch(() => {
          if (typeof window !== "undefined") {
            window.alert("Could not login!");
          }
        });
    });
  }
};

export default actions;
