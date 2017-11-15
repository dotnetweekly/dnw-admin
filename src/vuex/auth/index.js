import appService from "../../services/auth.service";

const state = {
  isAuthenticated: false
};

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated;
  }
};

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

const mutations = {
  logout(state) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", null);
      window.localStorage.setItem("tokenExpiration", null);
    }
    state.isAuthenticated = false;
  },
  login(state, token) {
    console.log(token);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token.token);
      window.localStorage.setItem("tokenExpiration", token.expiration);
    }
    state.isAuthenticated = true;
  }
};

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function(event) {
    let expiration = window.localStorage.getItem("tokenExpiration");
    var unixTimestamp = new Date().getTime() / 1000;
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      state.isAuthenticated = true;
    }
  });
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
