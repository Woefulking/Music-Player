import type { Album, AudiusAlbum, Track } from 'types/types';
import { mapArtist } from './mapArtist';
import { mapTrack } from './mapTrack';

export function mapAlbum(album: AudiusAlbum): Album {
  return {
    id: album.id,
    title: album.playlist_name,
    description: album.description,
    releaseDate: album.release_date,
    trackCount: album.track_count,
    artwork: album.artwork,
    artist: mapArtist(album.user),
    favoriteCount: album.favorite_count,
    playCount: album.play_count,
    access: {
      stream: album.access.stream,
      download: album.access.download,
    },
    tracks: album.tracks
      ? album.tracks.map(mapTrack).filter((track): track is Track => track !== null)
      : [],
  };
}
