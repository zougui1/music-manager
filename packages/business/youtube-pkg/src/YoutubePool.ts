import { isInRange } from 'utils-pkg';

import { YoutubeVideo } from './YoutubeVideo';

export class YoutubePool {

  static acceptedDurationOffset = 5;

  videos: TestedYoutubeVideo[] = [];
  expectedData: any;

  constructor(videos: YoutubeVideo[], expectedData: any) {
    const _videos = videos as TestedYoutubeVideo[];

    for (const video of _videos) {
      video.correctness = 100;
    }

    this.videos = _videos;
    this.expectedData = expectedData;
  }

  matchArtist(source: string | string[], artist: any): boolean {
    const names = [artist.name, ...artist.altNames];
    return names.some(artistName => source.includes(artistName.toLowerCase()));
  }

  async matchAgainstExpectations(video: TestedYoutubeVideo) {
    const { videoDetails } = await video.getInfo();
    const videoTitle = videoDetails.title.toLowerCase();
    const videoKeywords = (videoDetails.keywords ?? []).map(key => key.toLowerCase());
    const videoDuration = +videoDetails.lengthSeconds;

    const expectedAlbum = this.expectedData.album.toLowerCase();
    const expectedTitle = this.expectedData.title.toLowerCase();
    const expectedArtistNames = [this.expectedData.artist.name, ...this.expectedData.artist.altNames];
    const expectedMinDuration = Math.floor(this.expectedData.duration - YoutubePool.acceptedDurationOffset);
    const expectedMaxDuration = Math.floor(this.expectedData.duration + YoutubePool.acceptedDurationOffset);

    if (!videoTitle.includes(expectedAlbum)) {
      video.correctness -= 10;
    }

    if (!videoTitle.includes(expectedTitle)) {
      video.correctness -= 40;
    }

    if (!expectedArtistNames.some(artist => videoTitle.includes(artist.toLowerCase()))) {
      video.correctness -= 30;
    }

    if (!expectedArtistNames.some(artist => videoKeywords.includes(artist.toLowerCase()))) {
      video.correctness -= 50;
    }

    if (videoDetails.category.toLowerCase() !== 'music') {
      video.correctness -= 10;
    }

    if (!videoKeywords.includes(expectedAlbum)) {
      video.correctness -= 10;
    }

    if (!isInRange(videoDuration, expectedMinDuration, expectedMaxDuration)) {
      video.correctness -= 10;
    }
  }

  async matchAll() {
    // make all the necessary requests in parallel
    // since their result is cached they can be called
    // again at no cost
    await Promise.all(this.videos.map(video => video.getInfo()));

    for (const video of this.videos) {
      await this.matchAgainstExpectations(video);
    }
  }

  async getMostCorrectVideo(): Promise<TestedYoutubeVideo> {
    await this.matchAll();
    const sortedVideos = this.videos.sort((a, b) => b.correctness - a.correctness);

    return sortedVideos[0];
  }
}

interface TestedYoutubeVideo extends YoutubeVideo {
  correctness: number;
}
