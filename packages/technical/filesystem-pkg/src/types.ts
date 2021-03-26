import fs from 'fs-extra';

export interface WriteStream extends fs.WriteStream {
  waitFinish(listener: (filePath: string) => void): void;
}

export interface PathData {
  fileName?: string;
  extension?: string;
}
