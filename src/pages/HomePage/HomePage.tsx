import { useEffect, useState } from 'react';
import type { Track } from '../../types/types';
import { useOutletContext } from 'react-router-dom';
import LoadingIcon from '/assets/icons/loading.svg';
import { getFeelingLuckyTracks } from '../../api/getFeelingLuckyTracks';

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
        <img src={LoadingIcon} alt="loading" className="w-24 h-24" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-8 pb-32">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Welcome</h1>
        <p className="text-zinc-400 mt-2">Listen to what we have chosen for you today.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
          "I'll Get Lucky" Playlist
        </h2>

        {randomTracks.length === 0 ? (
          <p className="text-sm text-zinc-500">Failed to load tracks. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {randomTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => onPlayTrack(track, randomTracks)}
                className="group flex cursor-pointer items-center gap-4 rounded-xl border border-zinc-900 bg-zinc-900/40 p-4 transition hover:bg-zinc-900 hover:border-zinc-800"
              >
                <img
                  src={track.artwork['150x150']}
                  alt={track.title}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover shadow-md"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-sm text-zinc-100 group-hover:text-white transition">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-zinc-400 mt-0.5">{track.user.handle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
