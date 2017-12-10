import Vue from 'vue';
import store from './store/index.js';
import AppLayout from './theme/Layout.vue';
import router from './router';
import request from './request';

const app = new Vue({
	router,
	...AppLayout,
	store
});

export { app, router, store };
