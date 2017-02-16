export default patterns => (/* input */) => {
  return function clean (/* log */) {
    return require('del')(patterns, { force: true });
  };
};
