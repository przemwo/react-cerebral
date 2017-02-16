import path from 'path';

const resolve = path.resolve;

const PROJECT_PATH = resolve(__dirname, '..');
const SRC_DIRNAME = 'src';
const OUT_DIRNAME = 'dist';
const TEST_DIRNAME = 'test';

const base = (...args) =>
  resolve.apply(resolve, [PROJECT_PATH, ...args]);

export default {
  PROJECT_PATH,
  SRC_DIRNAME,
  OUT_DIRNAME,
  TEST_DIRNAME,
  base,
  src: base.bind(null, SRC_DIRNAME),
  out: base.bind(null, OUT_DIRNAME),
  test: base.bind(null, TEST_DIRNAME)
};
