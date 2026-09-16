import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import type { Artist, Track } from 'types/types';
import { getUserById } from 'api/getUserById';
import { getUserTracks } from 'api/getUserTracks';
import LoadingIcon from '/assets/icons/loading.svg';

interface ArtistPageProps {
  onPlayTrack: (track: Track, tracks: Track[]) => void;
}

export const ArtistPage = () => {
  const { onPlayTrack } = useOutletContext<ArtistPageProps>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [artistInfo, setArtistInfo] = useState<Artist | null>(null);
  const [artistTracks, setArtistTracks] = useState<Track[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArtistProfile() {
      if (!id) return;
      try {
        setIsLoading(true);

        const [artistData, tracksData] = await Promise.all([getUserById(id), getUserTracks(id)]);

        setArtistInfo(artistData);
        setArtistTracks(tracksData);
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
        <img src={LoadingIcon} alt="loading" className="w-24 h-24" />
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
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-4 flex items-center gap-6">
        {artistInfo.profilePicture ? (
          <img
            src={artistInfo.profilePicture['480x480']}
            alt={artistInfo.handle}
            className="h-32 w-32 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="h-32 w-32 shrink-0 rounded-full bg-zinc-800" />
        )}

        <div className="min-w-0">
          <p className="mb-1 text-sm text-zinc-500">Artist</p>

          <h1 className="text-3xl font-bold tracking-tight">{artistInfo.handle}</h1>

          <p className="mt-2 text-sm text-zinc-400">{artistTracks.length} tracks</p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Tracks</h2>

        <div className="overflow-hidden rounded-xl border border-zinc-800 max-h-107.5 overflow-y-auto">
          {artistTracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                onPlayTrack(track, artistTracks);
              }}
              className="w-full group flex items-center gap-4 border-b border-zinc-800 p-3 transition last:border-b-0 hover:bg-zinc-900"
            >
              <span className="w-6 text-center text-sm text-zinc-600">{index + 1}</span>

              {track.artwork?.['150x150'] ? (
                <img
                  src={track.artwork['150x150']}
                  alt={track.title}
                  className="h-12 w-12 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="h-12 w-12 shrink-0 rounded-full bg-zinc-800" />
              )}

              <div className="min-w-0 flex-1 flex flex-col items-start">
                <p className="truncate font-medium text-zinc-100">{track.title}</p>

                <p className="truncate text-sm text-zinc-500">{track.user.handle}</p>
              </div>

              <span className="text-sm tabular-nums text-zinc-500">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
