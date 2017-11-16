const mutations = {
  logout(state) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", null);
      window.localStorage.setItem("tokenExpiration", null);
    }
    state.isAuthenticated = false;
  },
  login(state, token) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token.token);
      window.localStorage.setItem("tokenExpiration", token.expiration);
    }
    state.isAuthenticated = true;
  }
};

export default mutations;
