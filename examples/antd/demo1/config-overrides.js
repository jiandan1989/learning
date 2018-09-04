const {
  injectBabelPlugin
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', {
      libraryName: 'antd',
      style: 'css'
    }],
    config
  );
  config = injectBabelPlugin(
    ['import', {
      libraryName: 'antd',
      style: true
    }],
    config
  );
  config = rewireCssModules(config, env);
  config = {
    ...config,
    node: {
      dns: 'mock',
      fs: 'empty',
      path: true,
      url: false,
    },
    // target: "node-webkit",
  };
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true
  })(config, env);
  return config;
};
