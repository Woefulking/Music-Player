import type { Ref } from 'react';
import type { Track } from '../../types/types';

interface AutocompleteProps {
  suggestions: Track[];
  ref: Ref<HTMLDivElement>;
  onSelect: (track: Track, tracks: Track[]) => void;
  onClose: () => void;
}

export const Autocomplete = ({ suggestions, ref, onSelect, onClose }: AutocompleteProps) => {
  if (!suggestions) return null;

  const hasResults = suggestions && suggestions.length > 0;
  // suggestions.albums.length > 0 ||
  // suggestions.artists.length > 0);

  return (
    <div
      ref={ref}
      className="max-h-[80vh] overflow-y-auto absolute left-1/2 top-full z-20 mt-2 w-150 -translate-x-1/2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl"
    >
      {!hasResults && <div className="p-4 text-center text-md text-zinc-500">Nothing found</div>}

      {suggestions.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Tracks
          </h3>

          <div className="flex flex-col">
            {suggestions.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  onSelect(track, suggestions);
                  onClose();
                }}
                className="cursor-pointer flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-zinc-800"
              >
                {track.artwork && (
                  <img
                    src={track.artwork['150x150'] || undefined}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">{track.title}</p>

                  <p className="truncate text-xs text-zinc-500">{track.user.handle}</p>
                </div>

                <span className="text-xs text-zinc-500">
                  {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* {suggestions.albums.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Albums
          </h3>

          <div className="flex flex-col">
            {suggestions.albums.map((album) => (
              <button
                key={album.id}
                type="button"
                className="cursor-pointer flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-zinc-800"
              >
                <img
                  src={album.artwork['150x150']}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-100">{album.title}</p>

                  <p className="truncate text-xs text-zinc-500">{album.artist.handle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {suggestions.artists.length > 0 && (
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Artists
          </h3>

          <div className="flex flex-col">
            {suggestions.artists.map((artist) => (
              <button
                key={artist.id}
                type="button"
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

                <p className="truncate text-sm font-medium text-zinc-100">{artist.handle}</p>
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};
