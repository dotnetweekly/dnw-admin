import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.api;

axios.interceptors.request.use(function(config) {
	if (typeof window === 'undefined') {
		return config;
	}
	const token = window.localStorage.getItem('dnwAdminToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axios.interceptors.response.use(undefined, (err) => {
	let res = err.response;
	if (res.status === 401 || (res.body && !res.body.success)) {
		return Promise.reject(error);
	}
});

export default axios;
