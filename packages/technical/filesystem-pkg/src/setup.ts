import fs from 'fs-extra';

import { APP_DIR, TEMP_DIR } from './env';

fs.ensureDir(TEMP_DIR);
fs.ensureDir(APP_DIR);
