import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/modules/store'

// import pages
import MainPage from '@/pages/MainPage';
import SettingsPage from '@/pages/SettingsPage';
import LoginPage from '@/pages/LoginPage';

Vue.use(VueRouter);

const publicPages = ['loginPage'];

const routes = [
  { path: '/', name: 'root', redirect: {name: 'mainPage'} },
  { path: '/main', name: 'mainPage', component: MainPage },
  { path: '/settings', name: 'settingsPage', component: SettingsPage },
  { path: '/login', name: 'loginPage', component: LoginPage }
];

const router = new VueRouter({ 
  mode: 'history',
  routes 
});

const checkValidPage = (to) => {
  let link = router.resolve(to)
  return link.resolved.matched.length > 0;
};

router.beforeEach((to, from, next) => { 
  if (!checkValidPage(to)) {
    next('/main');
  } 
  if (publicPages.includes(to.name) || store.state.isLogin) {
    next();
  } else {
    next('/login');
  }
  next();
});

export default router;
