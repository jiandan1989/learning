import Vue from 'vue';
import VueRouter from 'vue-router';

const _import = require('./import_' + process.env.NODE_ENV);

import Layout from '../views/layout/Layout.vue';

Vue.use(VueRouter);

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  name: 'login',
}, {
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'el-icon-sold-out',
      noCache: true
    },
  }],
}, {
  path: '/demo',
  component: Layout,
  redirect: '/demo/index',
  children: [{
    path: 'index',
    component: _import('demo/index'),
    name: 'demo',
    meta: {
      title: 'demo',
      icon: 'el-icon-circle-check',
      noCache: true
    }
  }]
}, {
  path: '/notFound',
  component: Layout,
  redirect: '/notFound/index',
  children: [{
    path: 'index',
    component: _import('notFound/index'),
    name: 'notFound',
    meta: {
      title: 'notFound',
      icon: '',
      noCache: true
    },
  }]
}];


export default new VueRouter({
  routes: constantRouterMap,
});
