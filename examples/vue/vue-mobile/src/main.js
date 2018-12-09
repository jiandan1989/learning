/**
 * @desc: 入口文件
 * @todo
 * 1. 提交时 btn loading
 * 2. 提交成功 显示成功, 并显示单号 可复制
 * 3. 提交失败, 显示失败页
 * 4. 404 页, 统一的错误页
 * 5. 获取用户信息, 商家列表
 */

import Vue from 'vue';
import Meta from 'vue-meta';
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Upload,
  Toast,
  Checker,
  Dialog,
  Validator,
  Input,
  ImagePreview,
  Form,
} from 'cube-ui';

import 'lib-flexible/flexible';
import router from './router';

import App from './App.vue';

Vue.use(Meta);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Toast);
Vue.use(Checker);
Vue.use(Dialog);
Vue.use(Validator);
Vue.use(Input);
Vue.use(ImagePreview);
Vue.use(Form);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
