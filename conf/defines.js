export default {
  production: {
    '__API_ROOT__': 'window.location.origin + "/"'
  },
  development: {
    '__API_ROOT__': JSON.stringify('http://localhost:3000/')
  },
  test: {
    '__API_ROOT__': JSON.stringify('http://localhost:3000/')
  }
};
