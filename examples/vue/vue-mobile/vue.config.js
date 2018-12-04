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
        views: '@/views/',
        components: '@/components/',
      },
    },
    plugins: [],
  },
  // chainWebpack: config => {
  //   config.module.rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => options),
  // }
};
