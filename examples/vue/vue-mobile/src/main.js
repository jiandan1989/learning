/**
 * @desc: 入口文件
 */

import Vue from 'vue';
import App from './App.vue';

import 'lib-flexible/flexible';
// import 'normalize.css';
import router from './router';


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
