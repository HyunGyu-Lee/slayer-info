import Vue from 'vue';
import VueRouter from 'vue-router';

// import pages
import MainPage from '@/pages/MainPage';
import SettingsPage from '@/pages/SettingsPage';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: {name: 'mainPage'} },
  { path: '/main', name: 'mainPage', component: MainPage },
  { path: '/settings', name: 'settingsPage', component: SettingsPage }
];

const router = new VueRouter({ 
  mode: 'history',
  routes 
});

export default router;
