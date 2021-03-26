import '../setup';
import { createConnection } from 'database-pkg';
import { Music } from 'music-pkg';
import { Playlist } from 'playlist-pkg';

export async function main(args: any): Promise<void> {
  const connection = await createConnection();

  try {
    await clearDatabase();
    await populateDatabase();
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}

const clearDatabase = async (): Promise<void> => {
  const music = new Music();
  const playlist = new Playlist();

  await music.clear();
  await playlist.clear();
}

const populateDatabase = async (): Promise<void> => {
  const music = new Music();

  await Promise.all([
    music.create({
      album: 'album',
      approved: false,
      artists: ['dArtagnan'],
      correctness: 45,
      duration: 45,
      link: 'http://some.fo',
      source: {},
      tags: [],
      thumbnail: 'http://some.fo',
      title: 'Title',
    }),
  ]);
}
