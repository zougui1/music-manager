//const reYoutubeUrl = /(?:youtube\.com\/([^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
const reYoutubeId = /(?:youtube\.com\/watch\?v=([^"&?\/\s]{11})|(?:youtu\.be\/[^"&?\/\s]{11}))/i;

export const getYoutubeUrl = (url: string): string => {
  return url.startsWith('http')
    ? url
    : `https://youtu.be/${url}`;
}

export const getThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

export const getYoutubeId = (urlOrId: string): string | undefined => {
  const url = getYoutubeUrl(urlOrId);
  const videoIdMatch = url.match(reYoutubeId);

  if (!videoIdMatch) {
    return;
  }

  return videoIdMatch[1];
}
