// const PostCompilePlugin = require('webpack-post-compile-plugin');
const TransformModulesPlugin = require('webpack-transform-modules-plugin');

// vue.config.js
module.exports = {
  // 服务配置
  devServer: {
    port: 3000,
  },
  productionSourceMap: false,
  lintOnSave: undefined,
  // 自定义
  configureWebpack: {
    resolve: {
      // extensions: ['.vue'],
      alias: { // 指定别名
        'cube-ui': 'cube-ui/lib',
        views: '@/views/',
        components: '@/components/',
      },
    },
    plugins: [
      new TransformModulesPlugin(),
    ],
  },
  // chainWebpack: config => {
  //   config.module.rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => options),
  // }
};
