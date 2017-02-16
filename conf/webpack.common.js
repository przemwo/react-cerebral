import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import { readFileSync } from 'fs';

import defines from './defines';
import buildPathsHelpers from './buildPathsHelpers';
import pkg from '../package.json';

function getDefines () {
  const envDefines = defines[process.env.NODE_ENV];
  return Object.keys(envDefines || {})
    .reduce((acc, key) => {
      acc[key] = envDefines[key];
      return acc;
    }, {});
}

// env.build_number is provided by Team City during build
const APP_VERSION = process.env.build_number || pkg.version;

const babelRC = JSON.parse(
  readFileSync(buildPathsHelpers.base('.babelrc'), 'utf-8')
);
const babelOptions = {
  ...babelRC,
  presets: (babelRC.presets || []).map(preset => {
    if (preset === 'es2015') {
      return ['es2015', { modules: false }];
    }

    if (Array.isArray(preset) && preset[0] === 'es2015') {
      return ['es2015', { ...preset[1], modules: false }];
    }

    return preset;
  }),
  babelrc: false,
  cacheDirectory: true
};

export default {
  stats: {
    colors: true,
    hash: false,
    version: false,
    children: false,
    chunkModules: false
  },
  resolve: {
    extensions: [
      '.js',
      '.json'
    ],
    alias: {
      'app': buildPathsHelpers.src(),
      'common': buildPathsHelpers.src('common'),
      'computed': buildPathsHelpers.src('computed'),
      'modules': buildPathsHelpers.src('modules')
    }
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [
          buildPathsHelpers.src(),
          __dirname
        ],
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'assets/images/[name]-[hash].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __APP_VERSION__: JSON.stringify(APP_VERSION),
      ...getDefines()
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss () {
          return [
            autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
            nested
          ];
        }
      }
    })
  ]
};
