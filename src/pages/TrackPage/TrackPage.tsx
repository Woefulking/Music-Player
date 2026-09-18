import { Link, useParams } from 'react-router-dom';
import type { Track } from 'types/types';
import { useEffect, useState } from 'react';
import LoadingIcon from '/assets/icons/loading.svg';
import { getTrackById } from 'src/api/getTrackById';

export const TrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAlbumData() {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getTrackById(id);
        setTrack(data);
      } catch (error) {
        console.error('Error loading album details', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAlbumData();
  }, [id]);

  if (!track) {
    return (
      <div className="flex flex-1 items-center justify-center text-zinc-400 text-xl">
        Track not found
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full flex-1 flex flex-col gap-4 justify-center items-center">
        <p>Loading track...</p>
        <img src={LoadingIcon} alt="loading" className="w-12 h-12 md:w-24 md:h-24" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-24">
      <div className="flex flex-col items-center justify-center">
        {track.artwork?.['480x480'] ? (
          <img
            src={track.artwork['480x480']}
            alt={track.title}
            className="w-72 h-72 rounded-lg object-cover"
          />
        ) : (
          <div className="w-72 h-72 shrink-0 rounded-lg bg-zinc-800" />
        )}

        <h1 className="mt-8 text-3xl font-bold">{track.title}</h1>

        <Link to={`/artist/${track.user.id}`} className="cursor-pointer mt-2 text-lg">
          {track.user.handle}
        </Link>
      </div>
    </div>
  );
};
