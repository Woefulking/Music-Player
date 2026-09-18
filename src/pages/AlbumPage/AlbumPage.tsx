import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { getAlbumById } from 'src/api/getAlbumById';
import type { Album, Track } from 'src/types/types';
import LoadingIcon from '/assets/icons/loading.svg';
import RedHeartIcon from '/assets/icons/heartred.svg';

interface AlbumPageProps {
  onPlayTrack: (track: Track, tracks: Track[]) => void;
}

export const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();

  const { onPlayTrack } = useOutletContext<AlbumPageProps>();

  const [album, setAlbum] = useState<Album>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAlbumData() {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getAlbumById(id);
        setAlbum(data);
      } catch (error) {
        console.error('Error loading album details', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAlbumData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full flex-1 flex flex-col gap-4 justify-center items-center">
        <p>Loading album...</p>
        <img src={LoadingIcon} alt="loading" className="w-12 h-12 md:w-24 md:h-24" />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex flex-1 items-center justify-center text-zinc-400 text-xl">
        Album not found
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-3 sm:px-6 sm:py-6 space-y-6 sm:space-y-8 pb-32">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 border-b border-zinc-800 pb-6 sm:pb-8">
        {album.artwork?.['480x480'] ? (
          <img
            src={album.artwork['480x480']}
            alt={album.title}

            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-2xl object-cover shadow-2xl border border-zinc-800 shrink-0"
          />
        ) : (
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-2xl bg-zinc-800 flex items-center justify-center text-4xl sm:text-5xl shrink-0"></div>
        )}

        <div className="text-center md:text-left space-y-2 sm:space-y-3 min-w-0">
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-zinc-500">
            Album
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-zinc-100 tracking-tight leading-tight">
            {album.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs sm:text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200">{album.artist.handle}</span>
            <span className="text-zinc-600">•</span>
            <span>{new Date(album.releaseDate).getFullYear()}</span>
            <span className="text-zinc-600">•</span>
            <span>{album.tracks.length} tracks</span>
            {album.favoriteCount > 0 && (
              <>
                <span className="text-zinc-600">•</span>
                <div className="text-zinc-300 flex flex-row gap-1 items-center">
                  <img
                    src={RedHeartIcon}
                    alt="favorite icon"
                    className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                  />
                  <span>{album.favoriteCount}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {album.description && (
        <div className="bg-zinc-900/30 border border-zinc-900/80 rounded-xl p-4 md:p-5">
          <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
            About Album
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-h-32 overflow-y-auto pr-2 scrollbar-thin">
            {album.description}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-200 px-1">Tracks</h2>

        <div className="flex flex-col gap-1">
          {album.tracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => onPlayTrack(track, album.tracks)}
              className="group flex items-center gap-3 sm:gap-4 rounded-xl p-2 sm:p-3 cursor-pointer transition hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/40 text-left active:scale-[0.995]"
            >
              <span className="w-5 text-center text-xs sm:text-sm font-medium text-zinc-600 group-hover:text-zinc-400 shrink-0">
                {index + 1}
              </span>

              {track.artwork?.['150x150'] ? (
                <img
                  src={track.artwork['150x150']}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-md object-cover border border-zinc-800 shadow-sm"
                />
              ) : (
                <div className="h-10 w-10 shrink-0 rounded-md bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 shadow-sm"></div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-xs sm:text-sm text-zinc-100 group-hover:text-red-400 transition">
                  {track.title}
                </p>
                <p className="truncate text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                  {track.genre || 'Pop'}
                </p>
              </div>

              {track.playCount > 0 && (
                <span className="text-xs text-zinc-600 tabular-nums hidden md:block shrink-0 mr-4">
                  {track.playCount.toLocaleString()}
                </span>
              )}

              <span className="text-xs tabular-nums text-zinc-500 shrink-0">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
