import { videoInfo } from 'ytdl-core';
import { isInRange } from 'utils-pkg';

import { YoutubeVideo } from './YoutubeVideo';
import { TestedYoutubeVideo, ExpectedData, FormattedExpectedData, FormattedVideoData } from './types';

const toleratedDurationDelta = 5;

export const getMostCorrectVideo = async (videos: YoutubeVideo[], expectedData: ExpectedData): Promise<TestedYoutubeVideo> => {
  const computedVideos = await matchVideosCorrrectness(videos, expectedData);
  const sortedVideos = computedVideos.sort((a, b) => b.correctness - a.correctness);

  return sortedVideos[0];
}

const formatExpectedData = (expectedData: ExpectedData): FormattedExpectedData => {
  const album = expectedData.album.toLowerCase();
  const title = expectedData.title.toLowerCase();
  const artistNames = [
    expectedData.artist.name,
    ...expectedData.artist.altNames,
  ].map(a => a.toLowerCase());
  const minDuration = Math.floor(expectedData.duration - toleratedDurationDelta);
  const maxDuration = Math.floor(expectedData.duration + toleratedDurationDelta);

  return {
    album,
    title,
    artistNames,
    minDuration,
    maxDuration,
  };
}

const formatVideoData = (info: videoInfo): FormattedVideoData => {
  const title = info.videoDetails.title.toLowerCase();
  const keywords = (info.videoDetails.keywords ?? []).map(key => key.toLowerCase());
  const duration = +info.videoDetails.lengthSeconds;
  const category = info.videoDetails.category.toLowerCase();

  return {
    title,
    keywords,
    duration,
    category,
  };
}

const computeCorrectness = async (video: YoutubeVideo, expectedData: FormattedExpectedData): Promise<number> => {
  const videoInfo = await video.getInfo();
  const videoData = formatVideoData(videoInfo);

  let correctness = 100;

  if (!videoData.title.includes(expectedData.album)) {
    correctness -= 10;
  }

  if (!videoData.title.includes(expectedData.title)) {
    correctness -= 40;
  }

  if (!expectedData.artistNames.some(artist => videoData.title.includes(artist.toLowerCase()))) {
    correctness -= 30;
  }

  if (!expectedData.artistNames.some(artist => videoData.keywords.includes(artist.toLowerCase()))) {
    correctness -= 50;
  }

  if (videoData.category !== 'music') {
    correctness -= 10;
  }

  if (!videoData.keywords.includes(expectedData.album)) {
    correctness -= 10;
  }

  if (!isInRange(videoData.duration, expectedData.minDuration, expectedData.maxDuration)) {
    correctness -= 10;
  }

  return correctness;
}

const matchVideosCorrrectness = async (videos: YoutubeVideo[], expectedData: ExpectedData) => {
  const testedVideos = videos as TestedYoutubeVideo[];

  // make all the necessary requests in parallel
  // since their result is cached they can be called
  // again at no cost
  await Promise.all(testedVideos.map(video => video.getInfo()));
  const cleanData = formatExpectedData(expectedData);

  const computeCorrectnesses = testedVideos.map(async video => {
    video.correctness = await computeCorrectness(video, cleanData);
    return video;
  });

  return await Promise.all(computeCorrectnesses);
}
