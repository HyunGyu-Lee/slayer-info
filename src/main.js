import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import moment from 'moment';
import lodash from 'lodash';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// import app components
import AppBiz from '@/modules/app';
import App from '@/App';
import router from '@/modules/router';
import store from '@/modules/store';

import '@/components'

Vue.config.productionTip = false

Vue.prototype.$moment = moment
Vue.prototype.$lds = lodash
Vue.prototype.$app = AppBiz

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
