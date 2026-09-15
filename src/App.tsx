import { useState } from 'react';
import type { AudioData } from './types/types';
import { Header } from './components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayer } from './hooks/usePlayer';
import { Player } from './pages/TrackPage/Player';
import { search } from './api/search';

function App() {
  const navigate = useNavigate();

  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const player = usePlayer();

  async function handleSearch(query: string) {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const data = await search(query);
      setAudioData(data);
    } catch (error) {
      console.error('ERROR', error);
      setAudioData(null);
    } finally {
      setIsLoading(false);
    }
  }

  // TODO
  // autocomplete
  // Список избранного

  return (
    <div className="relative flex min-h-dvh flex-col bg-zinc-950 text-zinc-100 gap-4">
      <Header onSearch={handleSearch} onSelectSong={player.playTrack} />
      <Outlet
        context={{
          audioData,
          isLoading,
          track: player.currentSong,
          onPlayTrack: player.playTrack,
          onPrevious: player.previousTrack,
          onNext: player.nextTrack,
          onBack: () => navigate(-1),
        }}
      />
      {player.currentSong && (
        <Player
          track={player.currentSong}
          onNext={player.nextTrack}
          onPrevious={player.previousTrack}
        />
      )}
    </div>
  );
}
export default App;
