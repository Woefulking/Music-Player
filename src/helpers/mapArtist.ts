import type { Artist, AudiusArtist } from '../types/types';

export function mapArtist(artist: AudiusArtist): Artist {
  return {
    id: artist.id,
    handle: artist.handle,
    profilePicture: artist.profile_picture,
  };
}
