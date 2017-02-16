import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';

import pkg from '../package.json';
import webpackCommonConfig from './webpack.common';
import buildPathsHelpers from './buildPathsHelpers';

const excludedFromVendorBundle = [
  '@powel/powelui',
  '@powel/echarts',
  'ramda'
];

export default {
  ...webpackCommonConfig,
  entry: {
    app: buildPathsHelpers.src(),
    vendor: Object.keys(pkg.dependencies).filter(
      x => excludedFromVendorBundle.indexOf(x) === -1
    )
  },
  output: {
    path: buildPathsHelpers.out(),
    filename: '[name].[chunkhash].js'
  },
  module: {
    ...webpackCommonConfig.module,
    rules: [
      ...webpackCommonConfig.module.rules,
      {
        test: /\.css$/,
        include: buildPathsHelpers.src(),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                minimize: true,
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        include: buildPathsHelpers.base('node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize&importLoaders=1',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    ...webpackCommonConfig.plugins,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js'
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true,
      ignoreOrder: true
    }),
    new HtmlPlugin({
      template: buildPathsHelpers.src('index.html'),
      favicon: buildPathsHelpers.src('assets/images/favicon.ico'),
      isProduction: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        screw_ie8: true,
        warnings: false
      }
    }),
    new OptimizeJsPlugin()
  ]
};
