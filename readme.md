# web-app-boilerplate

Opinionated boilerplate setup for single-page front-end applications.

## Features
 * Author your code, including tests, in [ES2015](https://babeljs.io/docs/learn-es2015/)+ via [Babel](http://babeljs.io/)
 * Component-based front-end development with [Webpack](https://webpack.github.io/), [CSS Modules](https://github.com/css-modules/css-modules) and [React](https://facebook.github.io/react)
 * Application state management via [Cerebral](https://cerebral.github.io/)
 * Pre-configured unit tests and coverage with [Jest](https://facebook.github.io/jest/)
 * Code liniting with [ESLint](http://eslint.org) using [eslint-config-powel](https://github.com/powelas/eslint-config-powel)
 * Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) with [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
 * [Tasks for common operations](#available-tasks),
 * Includes sample application with basic form validation, routing, http requests etc. (feel free to remove the parts that you don't need)

## Quick start 🔌
This project is intended to be used with [Node.js v4.7.2 (LTS)](https://nodejs.org/dist/latest-argon/docs/api/) or later and [NPM](https://docs.npmjs.com/). Make sure you have those installed.

1. Install deps and run `dev` task. It will build the sample application and start the Webpack development server.

   ```sh
   npm install
   npm run dev
   ```

2. Open `localhost:3000` in your browser to view the demo.

## Available tasks 🛠
* `build` - build development bundle (outputs to `dist/`)
* `build:prod` - build optimized production bundle
* `dev` - build on file change and run a web server with hot module replacement
* `lint` - lint source files and tests
* `tdd` - run tests in TDD mode
* `test` - lint, run tests once and output coverage

## Notes 📝
You can run webpack dev server alongside your backend server. The solution is to proxy everything with a `*` star. In [tasks/index.js](tasks/index.js), change:

```javascript
webpackDevServer(/* ... */)
```

to:

```javascript
webpackDevServer({
  proxy: {
    '*': 'http://localhost:5000' // <-- Proxy everything
  }
})
```

## Readin’ 📚

For more details about using included libraries, such as [PowelUI](http://nuget-docs.powelasa.powel.com/powelui/docs/) or [Cerebral](https://cerebral.github.io/), refer to the following docs:

* [PowelUI docs](http://nuget-docs.powelasa.powel.com/powelui/docs/)
* [Cerebral docs](https://cerebral.github.io/)
* [Ramda docs](http://ramdajs.com/docs/)
