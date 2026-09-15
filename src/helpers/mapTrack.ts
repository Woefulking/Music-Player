import type { AudiusTrack, Track } from '../types/types';

export function mapTrack(track: AudiusTrack): Track | null {
  if (!track.stream) {
    return null;
  }

  return {
    id: track.id,
    title: track.title,
    duration: track.duration,
    genre: track.genre,
    releaseDate: track.release_date,
    playCount: track.play_count,
    favorite: track.favorite_count,

    artwork: {
      '150x150': track.artwork['150x150'],
      '480x480': track.artwork['480x480'],
      '1000x1000': track.artwork['1000x1000'],
    },

    user: {
      id: track.user.id,
      name: track.user.name,
      handle: track.user.handle,
      profile_picture: {
        '150x150': track.user.profile_picture['150x150'],
        '480x480': track.user.profile_picture['480x480'],
        '1000x1000': track.user.profile_picture['1000x1000'],
      },
    },

    stream: {
      url: track.stream.url,
    },
    download: track.download,

    isStreamable: track.is_streamable,
    isDownloadable: track.is_downloadable,
  };
}
