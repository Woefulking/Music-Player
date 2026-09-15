import { useState } from 'react';
import type { Track } from '../types/types';

export function usePlayer() {
  const [currentSong, setCurrentSong] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);

  const currentIndex = queue.findIndex((track) => track.id === currentSong?.id);

  function playTrack(track: Track, tracks: Track[]) {
    setQueue(tracks);
    setCurrentSong(track);
  }

  function nextTrack() {
    if (currentIndex === -1) return;

    if (currentIndex < queue.length - 1) {
      setCurrentSong(queue[currentIndex + 1]);
    }
  }

  function previousTrack() {
    if (currentIndex > 0) {
      setCurrentSong(queue[currentIndex - 1]);
    }
  }

  function stop() {
    setCurrentSong(null);
    setQueue([]);
  }

  return {
    currentSong,
    queue,
    playTrack,
    nextTrack,
    previousTrack,
    stop,
  };
}
