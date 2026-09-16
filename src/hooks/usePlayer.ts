import { useEffect, useRef, useState } from 'react';
import type { Track } from '../types/types';

export function usePlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);
  const [isMute, setIsMute] = useState(false);

  const previousVolume = useRef(volume);

  const [favorites, setFavorites] = useState<Track[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const currentIndex = queue.findIndex((track) => track.id === currentTrack?.id);

  function setTracks(track: Track, tracks: Track[]) {
    setCurrentTrack(track);
    setQueue(tracks);
  }

  function nextTrack() {
    if (currentIndex === -1) return;
    if (currentIndex < queue.length - 1) {
      setCurrentTrack(queue[currentIndex + 1]);
    }
  }

  function previousTrack() {
    if (currentIndex === -1) return;
    if (currentIndex > 0) {
      setCurrentTrack(queue[currentIndex - 1]);
    }
  }

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error('Playback failed:', error);
          setIsPlaying(false);
        });
    }
  }

  function toggleMute() {
    if (!audioRef.current) return;

    if (!isMute) {
      previousVolume.current = volume;
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMute(true);
    } else {
      audioRef.current.volume = previousVolume.current;
      setVolume(previousVolume.current);
      setIsMute(false);
    }
  }

  function changeVolume(newVolume: number) {
    if (!audioRef.current) return;

    audioRef.current.volume = newVolume;
    setVolume(newVolume);

    if (newVolume > 0) {
      previousVolume.current = newVolume;
      setIsMute(false);
    }
  }

  function seekTime(newTime: number) {
    if (!audioRef.current) return;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function toggleFavorite(track: Track) {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === track.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== track.id);
      } else {
        return [track, ...prevFavorites];
      }
    });
  }

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack?.stream.url]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(0);
    setDuration(0);

    audio.currentTime = 0;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      });
  }, [currentTrack?.stream.url]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return {
    audioRef,
    currentTrack,
    queue,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMute,
    favorites,
    toggleFavorite,
    setTracks,
    nextTrack,
    previousTrack,
    togglePlay,
    toggleMute,
    changeVolume,
    seekTime,
  };
}
