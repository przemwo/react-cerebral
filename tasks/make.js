export default dir => (/* input */) => {
  return function make (/* log */) {
    const mkdirp = require('mkdirp');

    return new Promise((resolve, reject) => {
      mkdirp(dir, err => err ? reject(err) : resolve());
    });
  };
};
