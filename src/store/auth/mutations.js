const mutations = {
  logout(state) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dnwAdminToken", null);
      window.localStorage.setItem("dnwAdminTokenExpiration", null);
    }
    state.isAuthenticated = false;
  },
  login(state, token) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dnwAdminToken", token.token);
      window.localStorage.setItem("dnwAdminTokenExpiration", token.expiration);
    }
    state.isAuthenticated = true;
  }
};

export default mutations;
