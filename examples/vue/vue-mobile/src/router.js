import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// eslint-disable-next-line import/no-unresolved
import Home from 'views/Home.vue';
// eslint-disable-next-line import/no-unresolved
import Upload from 'views/Upload.vue';
// eslint-disable-next-line import/no-unresolved
import EditImage from 'views/editImage.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/upload',
      name: 'upload',
      component: Upload,
    }, {
      path: '/editImg/:id',
      name: 'edit',
      component: EditImage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
