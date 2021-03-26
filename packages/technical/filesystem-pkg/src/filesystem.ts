import fs from 'fs-extra';
import path from 'path';

import { APP_DIR, TEMP_DIR } from './env';
import { getFileName } from './utils';
import { WriteStream, PathData } from './types';

export const getTempPath = (pathData: PathData): string => {
  return path.join(TEMP_DIR, getFileName(pathData));
}

export const getAppPath = (pathData: PathData): string => {
  return path.join(APP_DIR, getFileName(pathData));
}

export const writeFile = async (extension: string, data: any): Promise<string> => {
  const path = getAppPath({ extension });
  await fs.writeFile(path, data);
  return path;
}

export const createWriteStream = (extension: string): WriteStream => {
  const tempPath = getTempPath({ extension });
  const stream = fs.createWriteStream(tempPath) as WriteStream;

  stream.on('finish', async () => {
    const appPath = getAppPath({ extension });
    await fs.move(tempPath, appPath);
    stream.emit('file-created', appPath);
  });

  stream.waitFinish = (listener: (file: string) => void): void => {
    stream.on('file-created', (filePath: string) => {
      listener(filePath);
    });
  }

  return stream;
}

export async function readFile(fileName: string): Promise<Buffer>
export async function readFile(fileName: string, encoding: string): Promise<string>
export async function readFile(fileName: string, encoding?: string): Promise<string | Buffer> {
  const filePath = getAppPath({ fileName });

  return encoding
    ? await fs.readFile(filePath, encoding)
    : await fs.readFile(filePath);
}

export const fileExists = async (fileName: string): Promise<boolean> => {
  const filePath = getAppPath({ fileName });
  return await fs.pathExists(filePath);
}
