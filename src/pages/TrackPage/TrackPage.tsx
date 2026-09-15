import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import type { Track } from '../../types/types';
import { useEffect } from 'react';

interface TrackPageProps {
  track: Track;
}

export const TrackPage = () => {
  const { track } = useOutletContext<TrackPageProps>();
  const navigate = useNavigate();

  useEffect(() => {
    if (track.id) {
      navigate(`/track/${track.id}`, { replace: true });
    }
  }, [track.id, navigate]);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-24">
      <div className="flex flex-col items-center justify-center">
        <img
          src={track.artwork['480x480']}
          alt={track.title}
          className="w-72 h-72 rounded-lg object-cover"
        />

        <h1 className="mt-8 text-3xl font-bold">{track.title}</h1>

        <Link to={`/artist/${track.user.id}`} className="cursor-pointer mt-2 text-lg">
          {track.user.handle}
        </Link>
      </div>
    </div>
  );
};
