import * as envVar from './envVar';
import * as configEnv from './configEnv';

export * from './envVar';
export * from './configEnv';
export default {
  ...envVar,
  ...configEnv,
};
