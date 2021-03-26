import { DownloadedAudio, Downloader } from 'types-pkg';

import { SpotifyApi } from './SpotifyApi';
import { SpotifyTrack } from './SpotifyTrack';
import { ParsedSpotifyUrl } from './types';
import { parseSpotifyUrl, getSpotifyTrackUrl } from './utils';

export class SpotifyPlaylist implements Downloader {

  tracks: SpotifyTrack[] = [];
  url: string;
  id: string;
  api = new SpotifyApi();

  constructor(data: ParsedSpotifyUrl) {
    this.url = data.url;
    this.id = data.id;
  }

  //#region public
  async downloadAudio(): Promise<DownloadedAudio[]> {
    const playlist = await this.api.extractPlaylist(this.id);
    const tracks: DownloadedAudio[] = [];
    let i = 0;

    for (const track of playlist.tracks) {
      if (i++ !== 3) {
        continue;
      }

      const parsedUrl = parseSpotifyUrl(getSpotifyTrackUrl(track));

      console.log(track)
      // TODO handle correctly
      if (!parsedUrl) {
        throw new Error('Invalid URL');
      }

      const spotifyTrack = new SpotifyTrack(parsedUrl);
      tracks.push(await spotifyTrack.downloadAudio());
    }

    return tracks;
  }
  //#endregion
}
