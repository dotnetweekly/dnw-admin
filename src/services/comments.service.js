import axios from "axios";

const service = {
  getItems(paging) {
    return new Promise((resolve, reject) => {
      axios
        .get("/comments", paging)
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
        .get(`/comment/${id}`)
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
        .delete("/comments", { data: { ids } })
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
        .post("/comments/isActive", { ids, value: status })
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
        .post(`/comment/update/`, category)
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
