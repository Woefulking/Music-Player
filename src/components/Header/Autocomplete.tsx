import type { Ref } from 'react';
import type { AudioData, Track } from '../../types/types';
import { Link } from 'react-router-dom';

interface AutocompleteProps {
  suggestions: AudioData | null;
  ref: Ref<HTMLDivElement>;
  onSelect: (track: Track, tracks: Track[]) => void;
  onClose: () => void;
}

export const Autocomplete = ({ suggestions, ref, onSelect, onClose }: AutocompleteProps) => {
  if (!suggestions) return null;

  const hasResults = suggestions && suggestions.tracks.length > 0;
  suggestions.albums.length > 0 || suggestions.artists.length > 0;

  return (
    <div
      ref={ref}
      className="fixed sm:absolute left-0 sm:left-1/2 top-15 sm:top-full z-50 mt-1 sm:mt-2 w-full sm:w-150 sm:-translate-x-1/2 max-h-[calc(100vh-60px)] sm:max-h-[80vh] overflow-y-auto rounded-none sm:rounded-xl border-x-0 border-b sm:border border-zinc-800 bg-zinc-950 p-3 shadow-2xl"
    >
      {!hasResults && <div className="p-4 text-center text-md text-zinc-500">Nothing found</div>}

      {/* СЕКЦИЯ ТРЕКОВ */}
      {suggestions.tracks && suggestions.tracks.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Tracks
          </h3>
          <div className="flex flex-col">
            {suggestions.tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  onSelect(track, suggestions.tracks);
                  onClose();
                }}
                className="cursor-pointer flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-zinc-800"
              >
                {track.artwork?.['150x150'] ? (
                  <img
                    src={track.artwork['150x150']}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 shrink-0 rounded bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                    🎵
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">{track.title}</p>
                  <p className="truncate text-xs text-zinc-500">{track.user.handle}</p>
                </div>

                <span className="text-xs text-zinc-500 shrink-0">
                  {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* СЕКЦИЯ АЛЬБОМОВ */}
      {suggestions.albums && suggestions.albums.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Albums
          </h3>
          <div className="flex flex-col">
            {suggestions.albums.map((album) => (
              <Link
                to={`/album/${album.id}`}
                key={album.id}
                onClick={onClose} // 🌟 Полезно закрывать автокомплит при переходе на страницу альбома
                className="cursor-pointer flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-zinc-800"
              >
                {album.artwork?.['150x150'] ? (
                  <img
                    src={album.artwork['150x150']}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 shrink-0 rounded bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                    💽
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">{album.title}</p>
                  <p className="truncate text-xs text-zinc-500">
                    {album.artist?.handle || 'Unknown'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* СЕКЦИЯ АРТИСТОВ */}
      {suggestions.artists && suggestions.artists.length > 0 && (
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Artists
          </h3>
          <div className="flex flex-col">
            {suggestions.artists.map((artist) => (
              <Link
                to={`/artist/${artist.id}`}
                key={artist.id}
                onClick={onClose} // 🌟 Закрываем автокомплит при переходе к артисту
                className="cursor-pointer flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-zinc-800"
              >
                {artist.profilePicture ? (
                  <img
                    src={artist.profilePicture['150x150']}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-800" />
                )}

                <p className="truncate text-sm font-medium text-zinc-100 flex-1">{artist.handle}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
