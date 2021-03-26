import fs from 'fs-extra';
import * as fss from './filesystem';

export default {
  ...fs,
  ...fss,
};
