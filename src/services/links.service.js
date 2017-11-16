import axios from "axios";

const service = {
  getAll(page) {
    return new Promise((resolve, reject) => {
      axios
        .get("/admin/links", credentials)
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
