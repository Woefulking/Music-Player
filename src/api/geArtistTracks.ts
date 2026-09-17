import { mapTrack } from 'helpers/mapTrack';
import type { Track } from 'types/types';

export async function getArtistTracks(query: string) {
  const response = await fetch(`https://api.audius.co/v1/users/${query}/tracks`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();

  const tracks = data.data
    .map(mapTrack)
    .filter((track: Track | null): track is Track => track !== null);

  return tracks;
}
