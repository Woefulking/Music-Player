import { useEffect, useState } from 'react';
import type { Track } from 'types/types';
import { useOutletContext } from 'react-router-dom';
import LoadingIcon from '/assets/icons/loading.svg';
import { getFeelingLuckyTracks } from 'api/getFeelingLuckyTracks';

interface HomeContextProps {
  onPlayTrack: (track: Track, tracks: Track[]) => void;
}

export const HomePage = () => {
  const { onPlayTrack } = useOutletContext<HomeContextProps>();
  const [randomTracks, setRandomTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLuckyTracks() {
      try {
        setIsLoading(true);
        const data = await getFeelingLuckyTracks();
        setRandomTracks(data);
      } catch (error) {
        console.error('Failed to load random tracks', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLuckyTracks();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto w-full flex-1 flex justify-center items-center">
        <img src={LoadingIcon} alt="loading" className="w-12 h-12 md:w-24 md:h-24" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 pb-12">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Welcome</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 sm:mt-2">
          Listen to what we have chosen for you today.
        </p>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-200 mb-3 sm:mb-4 flex items-center gap-2">
          "I'll Get Lucky" Playlist
        </h2>

        {randomTracks.length === 0 ? (
          <p className="text-sm text-zinc-500">Failed to load tracks. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {randomTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => onPlayTrack(track, randomTracks)}

                className="group flex cursor-pointer items-center gap-3 sm:gap-4 rounded-xl border border-zinc-900 bg-zinc-900/40 p-3 sm:p-4 transition hover:bg-zinc-900 hover:border-zinc-800 active:scale-[0.99]"
              >
                {track?.artwork?.['150x150'] ? (
                  <img
                    src={track.artwork['150x150']}
                    alt={track.title}
                    className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-lg object-cover shadow-md"
                  />
                ) : (
                  <div className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-lg shadow-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs sm:text-base"></div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-xs sm:text-sm text-zinc-100 group-hover:text-white transition">
                    {track.title}
                  </p>
                  <p className="truncate text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">
                    {track.user.handle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
