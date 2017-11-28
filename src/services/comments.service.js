import axios from "axios";

const service = {
  getItems({ link }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/comments/${link}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  getItem({ link, id }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/comment/${link}/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  deleteItems({ ids, link }) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/comments/${link}`, { data: { ids } })
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  updateStatus({ ids, status, link }) {
    console.log(ids, { ids, status, link });
    return new Promise((resolve, reject) => {
      axios
        .post(`/comments/${link}/isActive`, { ids, value: status })
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  updateItem({ link, item }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/comment/${link}/${item._id}`, item)
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
