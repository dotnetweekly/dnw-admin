import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => System.import('./pages/Login.vue');

const Categories = () => System.import('./pages/Categories/CategoryList.vue');
const CategoryUpdate = () => System.import('./pages/Categories/CategoryUpdate.vue');

const Tags = () => System.import('./pages/Tags/TagList.vue');
const TagsUpdate = () => System.import('./pages/Tags/TagUpdate.vue');

const Links = () => System.import('./pages/Links/LinkList.vue');
const LinkUpdate = () => System.import('./pages/Links/LinkUpdate.vue');

const Users = () => System.import('./pages/Users/UserList.vue');
const UserEdit = () => System.import('./pages/Users/UserUpdate.vue');

const Newsletters = () => System.import('./pages/Newsletters/NewsletterList.vue');
const NewslettersUpdate = () => System.import('./pages/Newsletters/NewsletterUpdate.vue');

const Emails = () => System.import('./pages/Emails/Emails.vue');
const EmailNew = () => System.import('./pages/Emails/New.vue');
const EmailNewsletterCurrent = () => System.import('./pages/Emails/NewsletterCurrent.vue');
const EmailNewsletterRegistered = () => System.import('./pages/Emails/NewsletterRegistered.vue');
const EmailForgotPassword = () => System.import('./pages/Emails/ForgotPassword.vue');
const EmailUpdateEmail = () => System.import('./pages/Emails/UpdateEmail.vue');

const Ads = () => System.import('./pages/Ads/AdsList.vue');
const AdsUpdate = () => System.import('./pages/Ads/AdsUpdate.vue');

const Comments = () => System.import('./pages/Comments/CommentList.vue');
const CommentsUpdate = () => System.import('./pages/Comments/CommentUpdate.vue');

const NotFound = () => System.import('./theme/NotFound.vue');

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'is-active',
	scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
	routes: [
		{ path: '/categories', component: Categories },
		{ path: '/categories/add', component: CategoryUpdate },
		{ path: '/categories/edit/:id', component: CategoryUpdate },

		{ path: '/tags', component: Tags },
		{ path: '/tags/add', component: TagsUpdate },
		{ path: '/tags/edit/:id', component: TagsUpdate },

		{ path: '/links', component: Links },
		{ path: '/links/add', component: LinkUpdate },
		{ path: '/links/edit/:id', component: LinkUpdate },

		{ path: '/users', component: Users },
		{ path: '/users/add', component: UserEdit },
		{ path: '/users/edit/:id', component: UserEdit },

		{ path: '/newsletters', component: Newsletters },
		{ path: '/newsletters/add', component: NewslettersUpdate },
		{ path: '/newsletters/edit/:id', component: NewslettersUpdate },

		{ path: '/emails', component: Emails },
		{ path: '/emails/new', component: EmailNew },
		{ path: '/emails/newsletter-current', component: EmailNewsletterCurrent },
		{ path: '/emails/newsletter-registered', component: EmailNewsletterRegistered },
		{ path: '/emails/forgot-password', component: EmailForgotPassword },
		{ path: '/emails/update-email', component: EmailUpdateEmail },

		{ path: '/ads', component: Ads },
		{ path: '/ads/add', component: AdsUpdate },
		{ path: '/ads/edit/:id', component: AdsUpdate },
		,
		{ path: '/comments/:link?', component: Comments },
		{ path: '/comment/:id/', component: CommentsUpdate },
		{ path: '/comments/:link/:id/', component: CommentsUpdate },
		,
		{ path: '/login', component: Login },
		{ path: '*', component: NotFound }
	]
});

router.beforeEach((to, from, next) => {
	let expiration = window.localStorage.getItem('dnwAdminTokenExpiration');
	var unixTimestamp = new Date().getTime() / 1000;
	if (
		(expiration === null || expiration === 'null' || parseInt(expiration) - unixTimestamp < 0) &&
		to.path !== '/login'
	) {
		next({ path: '/login' });
	} else {
		next();
	}
});

export default router;
