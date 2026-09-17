import { mapAlbum } from 'src/helpers/mapAlbum';

export async function getArtistAlbums(query: String) {
  const response = await fetch(`https://api.audius.co/v1/users/${query}/albums`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data.map(mapAlbum);
}
