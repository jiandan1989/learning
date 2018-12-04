module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  // runtimeCompiler: true,
  // compiler: true,
  baseUrl: '/vue-element-demo/',
  devServer: {
    proxy: {
      '/login': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
