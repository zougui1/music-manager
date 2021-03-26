import ffmetadata from 'ffmetadata';

export const writeMetadata = (file: string, data: MusicMetadata): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    ffmetadata.write(file, data, {}, (err: Error) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

export interface MusicMetadata {
  artist: string;
  album: string;
  title: string;
  date: string;
  attachments: string[];
}
