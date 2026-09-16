import type { Album, AudiusAlbum } from 'types/types';
import { mapArtist } from './mapArtist';

export function mapAlbum(album: AudiusAlbum): Album {
  return {
    id: album.id,
    title: album.title,
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
  };
}
