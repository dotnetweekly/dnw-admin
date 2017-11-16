import axios from "axios";

const service = {
  getList(paging) {
    return new Promise((resolve, reject) => {
      axios
        .get("/categories", paging)
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
