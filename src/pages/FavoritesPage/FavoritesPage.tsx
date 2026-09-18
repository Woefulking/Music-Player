import { useOutletContext } from 'react-router-dom';
import type { Track } from 'src/types/types';
import HeartIcon from '/assets/icons/heart.svg';
import HeartRedIcon from '/assets/icons/heartred.svg';

interface FavoritesContextProps {
  favorites: Track[];
  onPlayTrack: (track: Track, tracks: Track[]) => void;
  onToggleFavorite: (track: Track) => void;
}

export const FavoritesPage = () => {
  const { favorites, onPlayTrack, onToggleFavorite } = useOutletContext<FavoritesContextProps>();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-6">
        <img src={HeartIcon} alt="favorites" className="w-12 h-12" />
        <h2 className="text-2xl font-bold text-zinc-200 mt-2">It's empty here for now.</h2>
        <p className="text-sm text-zinc-500 max-w-sm">
          Add your favorite tracks to your favorites using the heart icon on the player panel so
          they appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-4 space-y-8 pb-32 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 border-b border-zinc-800 pb-8">
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-linear-to-br from-red-600 to-rose-900 shadow-2xl flex items-center justify-center text-6xl select-none shrink-0 border border-red-500/20">
          <img src={HeartRedIcon} alt="favorites" className="w-16 h-16" />
        </div>

        <div className="text-center md:text-left space-y-2 min-w-0">
          <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">
            Playlist
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-100 tracking-tight">
            Favorite tracks
          </h1>
          <p className="text-sm text-zinc-400">
            Total tracks: <span className="font-semibold text-zinc-200">{favorites.length}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {favorites.map((track, index) => (
          <div
            key={track.id}
            onClick={() => onPlayTrack(track, favorites)}
            className="group flex items-center gap-4 rounded-xl p-3 cursor-pointer transition hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/50"
          >
            <span className="w-5 text-center text-sm font-medium text-zinc-500 group-hover:text-zinc-400">
              {index + 1}
            </span>

            {track.artwork?.['150x150'] ? (
              <img
                src={track.artwork['150x150']}
                alt={track.title}
                className="h-12 w-12 shrink-0 rounded-lg object-cover border border-zinc-800 shadow-sm"
              />
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-full bg-zinc-800" />
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-sm text-zinc-100 group-hover:text-red-400 transition">
                {track.title}
              </p>
              <p className="truncate text-xs text-zinc-400 mt-0.5">{track.user.handle}</p>
            </div>

            <span className="text-xs tabular-nums text-zinc-500 hidden sm:block">
              {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(track);
              }}
              className="cursor-pointer text-sm p-2 rounded-full hover:bg-zinc-800 text-red-500 transition hover:scale-105 active:scale-95 shrink-0"
              title="Удалить из избранного"
            >
              <img src={HeartRedIcon} alt="toggle favorite" className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
