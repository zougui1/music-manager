import '../setup';
import { createConnection } from 'database-pkg';
import { Music } from 'music-pkg';
import { Playlist } from 'playlist-pkg';
import { User } from 'user-pkg';
import { MusicStatus } from 'types-pkg';

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
  await Promise.all([
    populateForUser('zougui@gmail.com', 'nopassword'),
  ]);
}

const populateForUser = async (email: string, password: string): Promise<void> => {
  const playlist = new Playlist();
  const userService = new User();
  const user = await userService.login(email, password);

  const playlistsData = [1, 2, 3, 4, 5].map(order => {
    return {
      name: `some ${order}`,
      user: { id: user.id },
    };
  });

  const playlists: any[] = [];

  for (const playlistData of playlistsData) {
    playlists.push(await playlist.create(playlistData));
  }

  await Promise.all([
    createUserMusics(user.id, playlists[0].id),
  ]);
}

const createUserMusics = async (userId: number, playlistId: number): Promise<void> => {
  const music = new Music();
  const playlist = new Playlist();

  const _music = await music.create({
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
    user: { id: userId },
    status: MusicStatus.DOWNLOADED,
  });

  await playlist.addMusic(playlistId, _music);
}
