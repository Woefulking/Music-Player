import { mapArtist } from 'helpers/mapArtist';

export async function getUserById(query: string) {
  const response = await fetch(`https://api.audius.co/v1/users/${query}`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();
  return mapArtist(data.data);
}
