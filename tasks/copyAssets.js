import cpr from 'cpr';

import buildPathsHelpers from '../conf/buildPathsHelpers';

const paths = [
  {
    src: buildPathsHelpers.src('assets'),
    dest: buildPathsHelpers.out('assets')
  },
  {
    src: buildPathsHelpers.base('node_modules', '@powel/powelui', 'dist'),
    dest: buildPathsHelpers.out(),
    filter: p => /\.css$/.test(p)
  },
  {
    src: buildPathsHelpers.base('node_modules', '@powel/powelui', 'dist', 'fonts'),
    dest: buildPathsHelpers.out('fonts')
  }
];

export default (/* input */) => {
  return function copyAssets (/* log */) {
    // eslint-disable-next-line promise/param-names
    return new Promise((rootResolve, rootReject) => {
      return Promise.all(
        paths.map(path => {
          return new Promise((resolve, reject) => {
            cpr(path.src, path.dest, { filter: path.filter }, err => err ? reject(err) : resolve());
          });
        })
      )
      .then(rootResolve)
      .catch(rootResolve);
    });
  };
};
