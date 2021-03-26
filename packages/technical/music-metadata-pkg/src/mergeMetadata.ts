import fs from 'filesystem-pkg';
import got from 'got';
import path from 'path';
import { ffmpeg } from 'ffmpeg-pkg';

import { writeMetadata, MusicMetadata } from './writeMetadata';

const defaultExtension = 'jpg';

const writeDownloadStream = (url: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const writer = fs.createWriteStream(path.extname(url) || defaultExtension);
    const download = got.stream(url);

    download.on('error', reject).pipe(writer);
    writer.on('error', reject).waitFinish(resolve);
  });
}

export const mergeMusicMetadata = async (output: string, musicData: MusicData): Promise<string> => {
  const cover = await writeDownloadStream(musicData.coverUrl);
  const metadata: MusicMetadata = {
    artist: musicData.artists.join(', '),
    album: musicData.albumName,
    title: musicData.name,
    date: musicData.releaseDate,
    attachments: [cover],
  };

  await writeMetadata(output, metadata);

  const tempPath = fs.getTempPath({ extension: path.extname(output) });
  await ffmpeg(output)
    .addOutputOptions('-i', cover, '-map', '0:0', '-map', '1:0', '-c', 'copy', '-id3v2_version', '3')
    .save(tempPath)
    .promise;

  await fs.unlink(output);
  await fs.rename(tempPath, output);

  return cover;
}

export interface MusicData {
  coverUrl: string;
  artists: string[];
  albumName: string;
  name: string;
  releaseDate: string;
}
