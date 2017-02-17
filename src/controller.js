import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import Router from 'cerebral-router';
import HttpProvider from 'cerebral-provider-http';

import buildTargets from '../conf/buildTargets';

import app from './modules/app';
import players from './modules/players';
import repos from './modules/repos';

const isProduction = process.env.NODE_ENV === buildTargets.PRODUCTION;

const routes = {
  '/': 'players.routed',
  '/repos': 'repos.routed',
  '/*': 'app.notFoundRouted' // catch all route
};

const controller = Controller({
  devtools: isProduction ? null : Devtools({
    remoteDebugger: 'localhost:8585'
  }),
  router: Router({
    routes,
    onlyHash: true
  }),
  providers: [
    HttpProvider({
      // baseUrl: __API_ROOT__, // eslint-disable-line no-undef
      baseUrl: 'https://api.github.com',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  ],
  modules: {
    app,
    players,
    repos
  }
});

export default controller;
