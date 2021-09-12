import Vue from 'vue';
import Vuex from 'vuex';
import AppBiz from '@/modules/app';
import UserService from '@/modules/service/user';
import router from '@/modules/router';

Vue.use(Vuex);

const state = {
  isLogin: false,
  userInfo: {}
};

const mutations = {
  processLogin(state, userInfo) {
    state.isLogin = true;
    state.userInfo = userInfo;
  },
  processLogout(state) {
    state.isLogin = false;
    state.userInfo = {};
  },
  processUpdateLastModifiedAt(state, now) {
    state.userInfo.lastModifiedAt = now;
  }
};

const getters = {
}

const actions = {
  async login({ commit }, {userId, password}) {
    AppBiz.startLoading();
    let loginResult = await UserService.login(userId, password);
    if (loginResult.success) {
      commit('processLogin', loginResult.userInfo);
      router.push('/main');
    } else {
      AppBiz.toast(loginResult.message);
    }
    AppBiz.finishLoading();
  },
  logout({ commit }) {
    commit('processLogout');
    router.push('/login');
  },
  updateLastModifiedAt({ commit }, now) {
    commit('processUpdateLastModifiedAt', now);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});