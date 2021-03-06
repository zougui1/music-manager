export default {
  home: 'Home',
  library: 'Library',
  search: 'Search',
  settings: 'Settings',
  playlists: 'Playlists',
  artists: 'Artists',
  albums: 'Albums',
  tracks: 'Tracks',
  '#': '#',
  title: 'Title',
  name: 'Name',
  album: 'Album',
  dateAdded: 'Date Added',
  time: 'Time',
  loading: 'Loading...',
  createPlaylist: 'Create Playlist',
  trackListInfo: `{count, plural,
    =0 {no songs}
    one {1 song,}
    other {{count} songs,}
  } {hours, plural,
    =0 {}
    other {{hours} hr}
  } {minutes, plural,
    =0 {}
    other {{minutes} min}
  } {seconds, plural,
    =0 {}
    other {{seconds} sec}
  }`,
  addSong: 'Add song',
  addPlaylist: 'Add playlist',
  newPlaylist: 'New playlist',
  playlistName: 'Playlist name',
  cancel: 'Cancel',
  ok: 'OK',
  serverProcessingRequest: 'The server is processing the request...',
  //serverDownloadingSong: 'The server is downloading song {downloadedCount}/{totalCount}...',
  serverDownloadingSong: `The server is downloading {downloadingCount, plural,
    one {a song}
    other {{downloadingCount} songs}
  } {totalCount, plural,
    one {}
    other{out of {totalCount} songs, {downloadedCount} downloaded}
  }...`,
  serverDownloadedSong: 'The server has downloaded the song.',
  serverDownloadFinish: 'The server has finished downloading the songs.',
  songDownloaded: '{title} has been downloaded.',
  serverDownloadSongFailure: 'The server could not download the song.',
  newSong: 'New song',
  link: 'Link',
  login: 'Login',
  signup: 'Signup',
  username: 'Username',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',

  form: {
    errors: {
      string: {
        empty: '{field} is required.',
        min: '{field} must contain at least {minLength} characters.',
        max: '{field} must not contain more than {maxLength} characters.',
        email: '{field} must be a valid email address.',
      },
      any: {
        only: '{field} must be equal to the {fieldToMatch}',
      },
    }
  }
};
