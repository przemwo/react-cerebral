import buildTargets from '../conf/buildTargets';

export default (files = ['.']) => (/* input */) => {
  return function eslint (log) {
    process.env.NODE_ENV = buildTargets.TEST;

    const { CLIEngine } = require('eslint');

    return new Promise((resolve, reject) => {
      const cli = new CLIEngine();

      const filesFiltered = files.filter(file => !cli.isPathIgnored(file));
      const report = cli.executeOnFiles(filesFiltered);

      const formatter = cli.getFormatter();

      if (report.errorCount > 0 || report.warningCount > 0) {
        console.log(formatter(report.results));
      }

      if (report.errorCount > 0) {
        return reject();
      }

      if (report.errorCount === 0) {
        log(`Our JS looks ${
          report.warningCount === 0
            ? 'great ✨'
            : 'OK, though there were warnings'
        }`);
      }

      resolve();
    });
  };
};
