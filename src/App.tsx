import { useState } from 'react';
import type { Track } from './types/types';
import { Header } from './components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayer } from './hooks/usePlayer';
import { search } from './api/search';
import { Player } from './components/Player/Player';

function App() {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const player = usePlayer();

  async function handleSearch(query: string) {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const data = await search(query);
      console.log(data);
      setTracks(data);
    } catch (error) {
      console.error('ERROR', error);
      setTracks([]);
    } finally {
      setIsLoading(false);
    }
  }

  // TODO
  // autocomplete
  // Список избранного

  return (
    <div className="relative flex min-h-dvh flex-col bg-zinc-950 text-zinc-100 gap-4">
      <Header onSearch={handleSearch} onSelectSong={player.setTracks} />
      <Outlet
        context={{
          tracks,
          isLoading,
          track: player.currentTrack,
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
