import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import type { Album, Artist, Track } from 'types/types';

import LoadingIcon from '/assets/icons/loading.svg';
import { getArtistById } from 'src/api/getArtistById';
import { getArtistTracks } from 'src/api/geArtistTracks';
import { getArtistAlbums } from 'src/api/getArtistAlbums';

interface ArtistPageProps {
  onPlayTrack: (track: Track, tracks: Track[]) => void;
}

export const ArtistPage = () => {
  const { onPlayTrack } = useOutletContext<ArtistPageProps>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [artistInfo, setArtistInfo] = useState<Artist | null>(null);
  const [artistTracks, setArtistTracks] = useState<Track[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArtistProfile() {
      if (!id) return;
      try {
        setIsLoading(true);

        const [artistData, tracksData, artistAlbums] = await Promise.all([
          getArtistById(id),
          getArtistTracks(id),
          getArtistAlbums(id),
        ]);

        setArtistInfo(artistData);
        setArtistTracks(tracksData);
        setArtistAlbums(artistAlbums);
      } catch (error) {
        console.error('Error loading artist profile', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadArtistProfile();
  }, [id]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full flex-1 flex flex-col gap-4 justify-center items-center">
        <p>Loading profile...</p>
        <img src={LoadingIcon} alt="loading" className="w-12 h-12 md:w-24 md:h-24" />
      </div>
    );
  }

  if (!artistInfo) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-zinc-400">
        <p>Artist not found</p>
        <button onClick={() => navigate(-1)} className="text-sm underline">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 space-y-8 pb-32">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left border-b border-zinc-900 pb-6">
        {artistInfo.profilePicture ? (
          <img
            src={artistInfo.profilePicture['480x480']}
            alt={artistInfo.handle}

            className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-full object-cover shadow-xl border border-zinc-800"
          />
        ) : (
          <div className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-full bg-zinc-800 shadow-xl" />
        )}

        <div className="min-w-0">
          <p className="mb-0.5 sm:mb-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Artist
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-100">
            {artistInfo.handle}
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-400">
            {artistTracks.length} tracks
          </p>
        </div>
      </div>

      {artistAlbums.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-200 px-1">Albums</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {artistAlbums.map((album) => (
              <Link
                to={`/album/${album.id}`}
                key={album.id}
                className="group cursor-pointer rounded-xl bg-zinc-900/30 border border-zinc-900 p-2 sm:p-3 transition hover:bg-zinc-900 hover:border-zinc-800 flex flex-col min-w-0 active:scale-[0.99]"
              >
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-zinc-800 relative mb-2 sm:mb-3 shadow-sm">
                  {album.artwork?.['150x150'] ? (
                    <img
                      src={album.artwork['150x150']}
                      alt={album.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-2xl bg-linear-to-br from-zinc-800 to-zinc-900 text-zinc-600"></div>
                  )}
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <p className="truncate font-semibold text-xs sm:text-sm text-zinc-100 group-hover:text-white transition">
                    {album.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-200 px-1">Tracks</h2>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/10">
          {artistTracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                onPlayTrack(track, artistTracks);
              }}
              className="w-full group flex items-center gap-3 sm:gap-4 border-b border-zinc-800 p-2 sm:p-3 transition last:border-b-0 hover:bg-zinc-900 text-left active:scale-[0.995]"
            >
              <span className="w-5 text-center text-xs sm:text-sm text-zinc-600 group-hover:text-zinc-400 shrink-0">
                {index + 1}
              </span>

              {track.artwork?.['150x150'] ? (
                <img
                  src={track.artwork['150x150']}
                  alt={track.title}
                  className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-md object-cover border border-zinc-800 shadow-sm"
                />
              ) : (
                <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs shadow-sm"></div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-xs sm:text-sm text-zinc-100 group-hover:text-red-400 transition">
                  {track.title}
                </p>
                <p className="truncate text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                  {track.user.handle}
                </p>
              </div>

              <span className="text-xs sm:text-sm tabular-nums text-zinc-500 shrink-0">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
