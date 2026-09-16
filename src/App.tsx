import { Header } from './components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayer } from './hooks/usePlayer';
import { Player } from './components/Player/Player';

function App() {
  const navigate = useNavigate();

  const player = usePlayer();

  // TODO
  // Список избранного

  return (
    <div className="relative flex min-h-dvh flex-col bg-zinc-950 text-zinc-100 gap-4">
      <Header onSelectSong={player.setTracks} />
      <Outlet
        context={{
          track: player.currentTrack,
          favorites: player.favorites,
          onToggleFavorite: player.toggleFavorite,
          onPlayTrack: player.setTracks,
          onPrevious: player.previousTrack,
          onNext: player.nextTrack,
          onBack: () => navigate(-1),
        }}
      />
      {player.currentTrack && (
        <Player
          track={player.currentTrack}
          isPlaying={player.isPlaying}
          currentTime={player.currentTime}
          duration={player.duration}
          volume={player.volume}
          isMute={player.isMute}
          isFavorite={player.favorites.some((fav) => fav.id === player.currentTrack?.id)}
          onToggleFavorite={() => player.toggleFavorite(player.currentTrack!)}
          onPrevious={player.previousTrack}
          onNext={player.nextTrack}
          onTogglePlay={player.togglePlay}
          onToggleMute={player.toggleMute}
          onChangeVolume={player.changeVolume}
          onSeekTime={player.seekTime}
        />
      )}
      <audio
        ref={player.audioRef}
        className="hidden"
        src={player.currentTrack?.stream.url || undefined}
      />
    </div>
  );
}
export default App;
