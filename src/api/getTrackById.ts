import { mapTrack } from 'src/helpers/mapTrack';

export async function getTrackById(query: String) {
  const response = await fetch(`https://api.audius.co/v1/tracks/${query}`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();

  return mapTrack(data.data);
}
