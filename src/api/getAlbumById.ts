import { mapAlbum } from 'src/helpers/mapAlbum';

export async function getAlbumById(query: String) {
  const response = await fetch(`https://api.audius.co/v1/playlists/${query}`);

  if (!response.ok) {
    throw new Error(`Audius API error: ${response.status}`);
  }

  const data = await response.json();

  return mapAlbum(data.data[0]);
}
