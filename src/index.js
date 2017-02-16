/**
 * App's entry point
 */
import './globals.css';

// polyfills
import 'babel-polyfill';
import 'location-origin';

import React from 'react';
import { render } from 'react-dom';
import { Container } from 'cerebral/react';

import { ROOT_ELEMENT_ID, APP_NAME } from 'common/constants';
import { useGlobalTitle } from 'common/components/setTitle';
import buildTargets from '../conf/buildTargets';
import controller from './controller';
import App from './components/App';

if (process.env.NODE_ENV === buildTargets.DEVELOPMENT) {
  window.ReactPerf = require('react-addons-perf');
}

useGlobalTitle(APP_NAME);

// Disable React Developer Tools in production mode
if (
  process.env.NODE_ENV === buildTargets.PRODUCTION &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
}

const rootEl = document.getElementById(ROOT_ELEMENT_ID);

if (process.env.NODE_ENV !== buildTargets.PRODUCTION && module.hot) {
  // using var deliberately to work around minification issue
  // eslint-disable-next-line no-var
  var { AppContainer } = require('react-hot-loader');

  const renderWithHotReload = () => {
    render(
      <AppContainer>
        <Container controller={controller}>
          <App />
        </Container>
      </AppContainer>,
      rootEl
    );
  };

  renderWithHotReload();

  module.hot.accept('./components/App', renderWithHotReload);
} else {
  render(
    <Container controller={controller}>
      <App />
    </Container>,
    rootEl
  );
}
