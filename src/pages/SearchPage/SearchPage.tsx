import { useOutletContext } from 'react-router-dom';
import type { AudioData, Track } from '../../types/types';
import { Link } from 'react-router-dom';
import LoadingIcon from '/assets/icons/loading.svg';

interface SearchPageProps {
  audioData: AudioData;
  isLoading: boolean;
  onPlayTrack: (track: Track, tracks: Track[]) => void;
}
export const SearchPage = () => {
  const { audioData, isLoading, onPlayTrack } = useOutletContext<SearchPageProps>();

  if (isLoading) {
    return (
      <div className="mx-auto w-full flex-1 flex justify-center items-center">
        <img src={LoadingIcon} alt="loading" className="w-24 h-24" />
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
    <div className="mx-auto w-full max-w-5xl px-6 py-6">
      <div className="max-h-[80vh] overflow-y-auto pr-2">
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Tracks</h2>

          <div className="flex flex-col gap-1">
            {audioData.tracks.map((track) => (
              <Link
                to={`/track/${track.id}`}
                key={track.id}
                onClick={() => {
                  onPlayTrack(track, audioData.tracks);
                }}
                className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition hover:bg-zinc-900"
              >
                <img
                  src={track.artwork['480x480']}
                  alt={track.title}
                  className="h-14 w-14 shrink-0 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-zinc-100">{track.title}</p>

                  <p className="truncate text-sm text-zinc-400">{track.user.handle}</p>
                </div>

                <span className="text-sm text-zinc-500">
                  {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Albums</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {audioData.albums.map((album) => (
              <div
                key={album.id}
                className="group cursor-pointer rounded-xl p-3 transition hover:bg-zinc-900"
              >
                <img
                  src={album.artwork['480x480']}
                  alt={album.title}
                  className="mb-3 aspect-square w-full rounded-lg object-cover"
                />

                <p className="truncate font-medium text-zinc-100">{album.title}</p>

                <p className="truncate text-sm text-zinc-400">{album.artist.handle}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Artists</h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {audioData.artists.map((artist) => (
              <div
                key={artist.id}
                className="flex cursor-pointer items-center gap-4 rounded-lg p-3 transition hover:bg-zinc-900"
              >
                {artist.profilePicture ? (
                  <img
                    src={artist.profilePicture['150x150']}
                    alt={artist.handle}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 shrink-0 rounded-full bg-zinc-800" />
                )}

                <p className="truncate font-medium text-zinc-100">{artist.handle}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
