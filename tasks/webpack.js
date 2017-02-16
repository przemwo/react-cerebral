import buildTargets from '../conf/buildTargets';

function runWebpack (config, log) {
  const webpack = require('webpack');

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err);
      }

      log(stats.toString(config.stats));
      resolve();
    });
  });
}

export const build = (/* input */) => {
  return function webpackBuild (log) {
    process.env.NODE_ENV = buildTargets.DEVELOPMENT;

    const webpackDevConfig = require('../conf/webpack.dev').default;

    return runWebpack(webpackDevConfig, log);
  };
};

export const buildProd = (/* input */) => {
  return function webpackBuildProd (log) {
    process.env.NODE_ENV = buildTargets.PRODUCTION;

    const webpackProdConfig = require('../conf/webpack.prod').default;

    return runWebpack(webpackProdConfig, log);
  };
};
