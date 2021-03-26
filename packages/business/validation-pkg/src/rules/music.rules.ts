export const music = {
  title: {
    minLength: 3,
    maxLength: 255,
  },
  link: {
    minLength: 3,
    maxLength: 500,
  },
  artist: {
    minLength: 3,
    maxLength: 100,
  },
  album: {
    minLength: 3,
    maxLength: 500,
  },
  source: {
    youtube: {
      minLength: 3,
      maxLength: 500,
    },
    spotify: {
      minLength: 3,
      maxLength: 500
    },
  },
  thumbnail: {
    minLength: 3,
    maxLength: 500,
  },
  tag: {
    minLength: 3,
    maxLength: 50,
  },
  duration: {
    min: 0,
  },
}
