import { useOutletContext, useSearchParams } from 'react-router-dom';
import type { AudioData, Track } from 'types/types';
import { Link } from 'react-router-dom';
import LoadingIcon from '/assets/icons/loading.svg';
import { useEffect, useState } from 'react';
import { search } from 'api/search';

interface SearchPageProps {
  onPlayTrack: (track: Track, tracks: Track[]) => void;
}
export const SearchPage = () => {
  const { onPlayTrack } = useOutletContext<SearchPageProps>();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    async function startSearch() {
      setIsLoading(true);
      try {
        const data = await search(query);
        setAudioData(data);
      } catch (error) {
        console.error('ERROR', error);
        setAudioData(null);
      } finally {
        setIsLoading(false);
      }
    }

    startSearch();
  }, [query]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full flex-1 flex justify-center items-center">
        <img src={LoadingIcon} alt="loading" className="w-12 h-12 md:w-24 md:h-24" />
      </div>
    );
  }

  if (!audioData) {
    return (
      <div className="mx-auto flex flex-1 items-center justify-center text-zinc-400 text-2xl">
        Nothing found
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-3 sm:px-6 sm:py-6 pb-32">
      <div className="space-y-8 sm:space-y-10">
        <section>
          <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-200 px-1">
            Tracks
          </h2>

          <div className="flex flex-col gap-1">
            {audioData.tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  onPlayTrack(track, audioData.tracks);
                }}
                className="group flex cursor-pointer items-center gap-3 sm:gap-4 rounded-lg p-2 sm:p-3 transition hover:bg-zinc-900 active:scale-[0.995]"
              >
                {track.artwork?.['150x150'] ? (
                  <img
                    src={track.artwork['150x150']}
                    alt={track.title}
                    className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-md object-cover border border-zinc-800"
                  />
                ) : (
                  <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-xs sm:text-sm text-zinc-100">
                    {track.title}
                  </p>
                  <p className="truncate text-[11px] sm:text-sm text-zinc-400 mt-0.5">
                    {track.user.handle}
                  </p>
                </div>

                <span className="text-xs sm:text-sm tabular-nums text-zinc-500 shrink-0">
                  {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-200 px-1">
            Albums
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {audioData.albums.map((album) => (
              <Link
                to={`/album/${album.id}`}
                key={album.id}
                className="group cursor-pointer rounded-xl p-2 sm:p-3 transition hover:bg-zinc-900 border border-transparent hover:border-zinc-800/40 bg-zinc-900/10"
              >
                {album.artwork?.['480x480'] ? (
                  <img
                    src={album.artwork['480x480']}
                    alt={album.title}
                    className="mb-2 sm:mb-3 aspect-square w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.02] shadow-sm"
                  />
                ) : (
                  <div className="mb-2 sm:mb-3 aspect-square w-full rounded-lg bg-zinc-800 flex items-center justify-center text-2xl text-zinc-600">
                    💽
                  </div>
                )}

                <p className="truncate font-medium text-xs sm:text-sm text-zinc-100 group-hover:text-white transition">
                  {album.title}
                </p>
                <p className="truncate text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                  {album.artist?.handle || 'Unknown'}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-200 px-1">
            Artists
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {audioData.artists.map((artist) => (
              <Link
                to={`/artist/${artist.id}`}
                key={artist.id}
                className="flex cursor-pointer items-center gap-3 sm:gap-4 rounded-lg p-2 sm:p-3 transition hover:bg-zinc-900 bg-zinc-900/10 border border-transparent hover:border-zinc-800/40"
              >
                {artist.profilePicture ? (
                  <img
                    src={artist.profilePicture['150x150']}
                    alt={artist.handle}
                    className="h-10 w-10 sm:h-14 sm:w-14 shrink-0 rounded-full object-cover border border-zinc-800 shadow-sm"
                  />
                ) : (
                  <div className="h-10 w-10 sm:h-14 sm:w-14 shrink-0 rounded-full bg-zinc-800" />
                )}

                <p className="truncate font-medium text-xs sm:text-sm text-zinc-100 flex-1">
                  {artist.handle}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
