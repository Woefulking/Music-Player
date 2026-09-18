import { mapTrack } from 'helpers/mapTrack';
import { mapAlbum } from 'src/helpers/mapAlbum';
import { mapArtist } from 'src/helpers/mapArtist';
import type { Album, Track } from 'types/types';

export async function search(query: string) {
  const response = await fetch(`https://api.audius.co/v1/search/full?query=${query}&limit=15`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();

  const tracks = data.data.tracks
    .map(mapTrack)
    .filter((track: Track | null): track is Track => track !== null);
  const albums = data.data.albums
    .map(mapAlbum)
    .filter((album: Album | null): album is Album => album !== null);
  const artists = data.data.users.map(mapArtist);

  return { tracks, albums, artists };
}
