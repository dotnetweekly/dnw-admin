import axios from "../request";

const service = {
  getItems({ link }) {
    const commentLink = link ? `/comments/${link}` : `/comments/`
    return new Promise((resolve, reject) => {
      axios
        .get(commentLink)
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  getItem({ link, id }) {
    const commentLink = link ? `/comment/${link}/${id}` : `/comment/${id}`
    return new Promise((resolve, reject) => {
      axios
        .get(commentLink)
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
        .delete(`/comments/`, { data: { ids } })
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.status);
        });
    });
  },
  updateStatus({ ids, status, link }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/comments/isActive`, { ids, value: status })
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
