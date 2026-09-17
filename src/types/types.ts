export interface Artwork {
  '150x150': string;
  '480x480': string;
  '1000x1000': string;
}

export interface Track {
  id: string;
  title: string;
  duration: number;
  genre: string;
  releaseDate: string;
  playCount: number;
  favorite: number;

  artwork: Artwork | null;

  user: {
    id: string;
    name: string;
    handle: string;
    profile_picture: Artwork | null;
  };

  stream: {
    url: string;
  };
  download: string | null;

  isStreamable: boolean;
  isDownloadable: boolean;
}

export interface AudiusTrack {
  id: string;
  title: string;
  duration: number;
  genre: string;
  mood: string;
  release_date: string;
  play_count: number;
  favorite_count: number;

  artwork: Artwork | null;

  user: {
    id: string;
    name: string;
    handle: string;
    profile_picture: Artwork | null;
  };

  stream: { url: string } | null;
  download: string | null;

  is_streamable: boolean;
  is_downloadable: boolean;
}

export interface Artist {
  id: string;
  handle: string;
  profilePicture: Artwork | null;
}

export interface AudiusArtist {
  id: string;
  handle: string;
  profile_picture: Artwork | null;
}

export interface Album {
  id: string;
  title: string;
  description: string | null;
  releaseDate: string;
  trackCount: number;
  artwork: Artwork;
  artist: Artist;
  favoriteCount: number;
  playCount: number;
  access: {
    stream: boolean;
    download: boolean;
  };
  tracks: Track[];
}

export interface AudiusAlbum {
  id: string;
  playlist_name: string;
  description: string | null;
  release_date: string;
  track_count: number;
  artwork: Artwork;
  user: AudiusArtist;
  favorite_count: number;
  play_count: number;
  access: {
    stream: boolean;
    download: boolean;
  };
  tracks: AudiusTrack[];
}

export interface AudioData {
  albums: Album[];
  tracks: Track[];
  artists: Artist[];
}
