const defaultServerOptions = {
  port: 3000,
  host: 'localhost'
};
const defaultDevServerOptions = {
  hot: true,
  overlay: true
};

export default (devServerOptions, serverOptions) => (/* input */) => {
  return function webpackDevServer (log) {
    process.env.NODE_ENV = 'development';

    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const webpackConfig = require('../conf/webpack.dev').default;

    return new Promise((resolve, reject) => {
      const { port, host } = {
        ...defaultServerOptions,
        ...serverOptions
      };
      const options = {
        ...defaultDevServerOptions,
        ...devServerOptions
      };

      const hmr = [
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        options.hotOnly
          ? 'webpack/hot/only-dev-server'
          : options.hot
            ? 'webpack/hot/dev-server'
            : null
      ].filter(Boolean);

      if (Array.isArray(webpackConfig.entry)) {
        webpackConfig.entry.unshift.apply(webpackConfig.entry, hmr);
      } else {
        webpackConfig.entry = hmr.concat(webpackConfig.entry);
      }

      webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
      webpackConfig.module.rules
        .filter(x => x.loader === 'babel-loader')
        .forEach(x => {
          x.query = {
            ...x.query,
            plugins: [
              ...(x.query ? x.query.plugins : []),
              'react-hot-loader/babel'
            ]
          };
        });

      const server = new WebpackDevServer(
        webpack(webpackConfig),
        {
          publicPath: webpackConfig.output.publicPath,
          contentBase: webpackConfig.output.path,
          stats: webpackConfig.stats,
          ...options
        }
      );

      server.listen(port, host, error => {
        if (error) {
          return reject(error);
        }

        log(`http://${host}:${port}/`);
        resolve();
      });
    });
  };
};
