import actions from './actions';
import mutations from './mutations';
import * as calendarHelper from '../../helpers/calendar';

const now = calendarHelper.getUtcNow();
const state = {
	links: [],
	filter: {
		categories: [],
		tags: [],
		users: [],
		weeks: [],
		years: []
	},
	selected: {
		category: '',
		tag: '',
		name: '',
		year: '',
		week: ''
	}
};

const getters = {
	links: state => {
		return state.links;
	},
	filter: state => {
		return state.filter;
	},
	selected: state => {
		return state.selected;
	}
};

for (var i = 1; i <= 53; i++) {
	state.filter.weeks.push(i.toString());
}

for (var i = 0; i <= 10; i++) {
	state.filter.years.push((now.getFullYear() - i).toString());
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
