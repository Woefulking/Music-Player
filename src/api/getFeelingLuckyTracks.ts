import { mapTrack } from 'helpers/mapTrack';
import type { Track } from 'types/types';

export async function getFeelingLuckyTracks() {
  const response = await fetch(`https://api.audius.co/v1/tracks/feeling-lucky?limit=9`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data.map(mapTrack).filter((track: Track | null): track is Track => track !== null);
}
