import Start from 'start';
import reporter from 'start-pretty-reporter';

import clean from './clean';
import make from './make';
import eslint from './eslint';
import webpackDevServer from './webpackDevServer';
import copyAssets from './copyAssets';
import jest from './jest';
import * as webpack from './webpack';

const start = Start(reporter());

const setupChain = [
  clean(['dist', 'coverage']),
  make('dist'),
  copyAssets
];

export function build () {
  return start(
    ...setupChain,
    webpack.build
  );
}

export function buildProd () {
  return start(
    ...setupChain,
    webpack.buildProd
  );
}

export function dev () {
  return start(
    build,
    webpackDevServer(/* {
      proxy: {
        '*': 'http://localhost:5000'
      }
    } */)
  );
}

export function lint () {
  return start(
    eslint([
      'src/',
      'tasks/',
      'conf/'
    ])
  );
}

export function tdd () {
  return start(
    jest({ watch: true })
  );
}

export function jestCi () {
  return start(
    jest({ coverage: true })
  ).then(process.exit);
}

export function test () {
  return start(
    lint,
    jestCi
  );
}
