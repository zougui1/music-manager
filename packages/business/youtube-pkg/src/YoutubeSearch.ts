import youtubeSearch, { VideoSearchResult, OptionsWithQuery, OptionsWithSearch } from 'yt-search';

import { YoutubeVideo } from './YoutubeVideo';
import { getMostCorrectVideo } from './getMostCorrectVideo';
import { SearchCriterias, TestedYoutubeVideo } from './types';

const youtubeBaseUrl = 'https://youtube.com';
const MINIMUM_VIDEO_CORRECTNESS = 50;

export class YoutubeSearch {

  //#region public
  async findVideoLink(search: string | OptionsWithQuery | OptionsWithSearch): Promise<string | undefined> {
    const result = await youtubeSearch(search);
    const [topResult] = result.videos;
    const youtubeLink = this.buildUrl(topResult)

    return youtubeLink;
  }

  async findVideos(search: string | OptionsWithQuery | OptionsWithSearch): Promise<VideoSearchResult[]> {
    const result = await youtubeSearch(search);
    const videos = result.videos.slice(0, 10).map(video => {
      video.url = this.buildUrl(video);
      return video;
    });

    return videos;
  }

  async findMostCorrectVideo(criterias: SearchCriterias): Promise<TestedYoutubeVideo | undefined> {
    let mostCorrectVideo: TestedYoutubeVideo | undefined = undefined;

    for (const artist of criterias.artists) {
      const foundVideos = await this.findVideos(`${artist.name} ${criterias.title}`);
      const currentCriterias = {
        album: criterias.album,
        title: criterias.title,
        duration: criterias.duration,
        artist,
      };

      const videos = foundVideos.map(v => new YoutubeVideo(v.url));
      const _mostCorrectVideo = await getMostCorrectVideo(videos, currentCriterias);
      mostCorrectVideo = _mostCorrectVideo;

      if (_mostCorrectVideo.correctness >= MINIMUM_VIDEO_CORRECTNESS) {
        mostCorrectVideo = _mostCorrectVideo;
        break;
      }

      if (_mostCorrectVideo.correctness > mostCorrectVideo.correctness) {
        mostCorrectVideo = _mostCorrectVideo;
      }
    }

    return mostCorrectVideo;
  }
  //#endregion

  //#region private
  private buildUrl(topResult: VideoSearchResult): string {
    return topResult.url.includes(youtubeBaseUrl)
      ? topResult.url
      : youtubeBaseUrl + topResult.url;
  }
  //#endregion
}
