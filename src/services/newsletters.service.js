import axios from "axios";

const service = {
  getItems(paging) {
    return new Promise((resolve, reject) => {
      axios
        .get("/newsletters", paging)
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
        .get(`/newsletter/${id}`)
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
        .delete("/newsletters", { data: { ids } })
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
        .post("/newsletters/isActive", { ids, value: status })
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
        .post(`/newsletter/update/`, category)
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
