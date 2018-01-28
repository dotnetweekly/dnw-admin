import axios from "../request";

const service = {
  getItems(paging) {
    return new Promise((resolve, reject) => {
      axios
        .get("/tags", paging)
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  getItem(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/tag/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  deleteItems(ids) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/tags", { data: { ids } })
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  updateStatus(ids, status) {
    return new Promise((resolve, reject) => {
      axios
        .post("/tags/isActive", { ids, value: status })
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  updateItem(category) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/tag/update/`, category)
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
