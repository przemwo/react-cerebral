import buildTargets from '../conf/buildTargets';
import buildPathsHelpers from '../conf/buildPathsHelpers';

export default (cliOptions, userConfig) => (/* input */) => {
  return function jest (/* log */) {
    const cli = require('jest-cli');
    const jestConfig = require('../package.json').jest;

    process.env.NODE_ENV = buildTargets.TEST;

    return new Promise((resolve, reject) => {
      const config = {
        rootDir: buildPathsHelpers.PROJECT_PATH,
        ...jestConfig,
        ...userConfig
      };

      cli.runCLI(
        {
          config,
          ...cliOptions
        },
        config.rootDir,
        result => (
          result.success
            ? resolve()
            : reject()
        )
      );
    });
  };
};
