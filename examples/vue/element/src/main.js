import Vue from 'vue';
import VueResource from 'vue-resource';

import VueParticles from 'vue-particles';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import App from './App.vue';
import router from './router';
import store from './store';


import i18n from './lang';
// import '@/styles/index.scss';

Vue.use(VueResource);
Vue.use(VueParticles);
Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value),
});

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app');

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // render: h => h(App),
  template: '<App/>',
  components: {
    App,
  },
});
