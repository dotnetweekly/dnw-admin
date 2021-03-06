import axios from "../request";

const service = {
  login(credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/login", credentials)
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  }
};

export default service;
