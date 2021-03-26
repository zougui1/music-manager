import SpotifyWebApi from 'spotify-web-api-node';

import { CLIENT_ID, CLIENT_SECRET } from './setup';
import { SpotifyInvalidUrlError, SpotifyNotFoundError, SpotifyUnknownError } from './errors';
import { UrlType } from './data';
import { Track, Playlist } from './types';

export class SpotifyApi extends SpotifyWebApi {

  constructor() {
    super({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET })
  }

  //#region public
  async extractTrack(trackId: string): Promise<Track> {
    return this.extractionHandler(() => this._extractTrack(trackId), UrlType.track);
  }

  async extractPlaylist(playlistId: string): Promise<Playlist> {
    return this.extractionHandler(() => this._extractPlaylist(playlistId), UrlType.playlist);
  }
  //#endregion

  //#region private
  async setup(): Promise<void> {
    const data = await this.clientCredentialsGrant();
    this.setAccessToken(data.body.access_token);
  }

  async extractionHandler<T>(extractor: () => Promise<T>, type: UrlType): Promise<T> {
    try {
      return extractor();
    } catch (error) {
      switch (error.body?.error.status) {
        case 404:
          throw new SpotifyNotFoundError(null, { type });
        case 400:
          throw new SpotifyInvalidUrlError();

        default:
          throw new SpotifyUnknownError();
      }
    }
  }

  async _extractTrack(trackId: string): Promise<Track> {
    await this.setup();

    const data = await this.getTrack(trackId);
    const artists = data.body.artists.map(a => a.name);

    return {
      name: data.body.name,
      artists,
      albumName: data.body.album.name,
      releaseDate: data.body.album.release_date,
      coverUrl: data.body.album.images[0].url,
      duration: data.body.duration_ms / 1000,
    };
  }

  async _extractPlaylist(playlistId: string): Promise<Playlist> {
    await this.setup();

    const data = await this.getPlaylist(playlistId);
    const details: Playlist = {
      name: data.body.name,
      totalTracks: data.body.tracks.total,
      tracks: [],
    };

    const addItems = (items: { track: { id: string } }[]) => {
      for (const item of items) {
        details.tracks.push(item.track.id);
      }
    }

    if (data.body.tracks.next) {
      for (let offset = 0; details.tracks.length < details.totalTracks; offset += 100) {
        const playlistTracks = await this.getPlaylistTracks(playlistId, { limit: 100, offset });

        addItems(playlistTracks.body.items);
      }
    } else {
      addItems(data.body.tracks.items);
    }

    return details;
  }
  //#endregion
}
