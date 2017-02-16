import HtmlPlugin from 'html-webpack-plugin';

import webpackCommonConfig from './webpack.common';
import buildPathsHelpers from './buildPathsHelpers';

export default {
  ...webpackCommonConfig,
  cache: true,
  stats: {
    ...webpackCommonConfig.stats,
    reasons: true
  },
  entry: [
    buildPathsHelpers.src()
  ],
  output: {
    path: buildPathsHelpers.out(),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      ...webpackCommonConfig.module.rules,
      {
        test: /\.css$/,
        exclude: /\.global\.css$/,
        include: buildPathsHelpers.src(),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:3]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: buildPathsHelpers.base('node_modules'),
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    ...webpackCommonConfig.plugins,
    new HtmlPlugin({
      template: buildPathsHelpers.src('index.html'),
      favicon: buildPathsHelpers.src('assets/images/favicon.ico')
    })
  ]
};
