import * as uuid from 'uuid';
import sanitize from 'sanitize-filename';

import { PathData } from './types';

const reSanitize = /^(\.)|(\.{2,})|(\/)|(\?.*)?/g;

const withExtension = (fileName: string, extension?: string): string => {
  if (!extension) {
    return fileName;
  }

  const extName = extension.replace(reSanitize, '');

  return fileName + '.' + sanitize(extName);
}

export const getFileName = (pathData: PathData): string => {
  return withExtension(pathData.fileName ?? uuid.v4(), pathData.extension);
}
