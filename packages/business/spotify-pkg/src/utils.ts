import { UrlType } from './data';
import { ParsedSpotifyUrl } from './types';
import { Youtube } from 'youtube-pkg';

const reSpotifyUrl = /^(?:https?:\/\/open.spotify.com\/(?:user\/spotify\/)?(playlist|track)\/|spotify:(?:user:spotify:)?(playlist|track):)([a-zA-Z0-9]+)(.*)$/i;
const reDash = /-/g;


export const getSpotifyTrackUrl = (urlOrId: string) => {
  return urlOrId.startsWith('http')
    ? urlOrId
    : `https://open.spotify.com/track/${urlOrId}`;
}

export const parseSpotifyUrl = (url: string): ParsedSpotifyUrl | undefined => {
  const match = url.match(reSpotifyUrl);

  if (!match) {
    return;
  }

  const dirtyType = match[1];
  const id = match[2] || match[3];
  const type = UrlType[dirtyType as unknown as UrlType];

  if (!type || !id) {
    return;
  }

  return { type, id, url };
}

export const getYoutubeLink = async (songName: string): Promise<string | undefined> => {
  const search = new Youtube.Search();

  try {
    return await search.findVideoLink(songName);
  } catch (_) {
    const cleanName = songName.replace(reDash, ' ');
    return await search.findVideoLink(cleanName);
  }
};
