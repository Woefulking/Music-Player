import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../helpers/formatTime';
import VolumeIcon from '/assets/icons/volume.svg';
import MuteIcon from '/assets/icons/mute.svg';
import PlayIcon from '/assets/icons/play.svg';
import PauseIcon from '/assets/icons/pause.svg';
import NextIcon from '/assets/icons/next.svg';
import PreviousIcon from '/assets/icons/previous.svg';
import type { Track } from '../../types/types';
import { Link } from 'react-router-dom';

interface PlayerProps {
  track: Track;
  onNext: () => void;
  onPrevious: () => void;
}
export const Player = ({ track, onPrevious, onNext }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolume = useRef(0.5);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);
  const [isMute, setIsMute] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Playback failed:', error);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
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
  };

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
      onNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track.stream.url]);

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
  }, [track.stream.url]);

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-zinc-800 bg-zinc-950/95 px-6 py-4 backdrop-blur z-50">
      <div className="mx-auto flex w-full items-center justify-between gap-4 max-w-6xl">
        <Link to={`/track/${track.id}`} className="flex items-center gap-3 w-1/4 min-w-0 group">
          <img
            src={track.artwork['150x150']}
            alt={track.title}
            className="h-14 w-14 shrink-0 rounded-md object-cover border border-zinc-800"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-100 group-hover:underline">
              {track.title}
            </p>
            <p className="truncate text-xs text-zinc-400">{track.user.handle}</p>
          </div>
        </Link>

        <div className="flex flex-1 flex-row items-center justify-center gap-4 max-w-2xl">
          <button
            onClick={onPrevious}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-zinc-800 shrink-0"
          >
            <img src={PreviousIcon} alt="Previous song" className="h-5 w-5" />
          </button>

          <button
            onClick={togglePlay}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition hover:bg-zinc-800 shrink-0"
          >
            <img
              src={isPlaying ? PauseIcon : PlayIcon}
              alt={isPlaying ? 'Pause' : 'Play'}
              className="h-6 w-6"
            />
          </button>

          <button
            onClick={onNext}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-zinc-800 shrink-0"
          >
            <img src={NextIcon} alt="Next song" className="h-5 w-5" />
          </button>

          <span className="whitespace-nowrap text-xs tabular-nums text-zinc-400 shrink-0">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            className="h-1 w-full cursor-pointer accent-zinc-100"
            onChange={(e) => {
              const newTime = Number(e.target.value);
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
              }
              setCurrentTime(newTime);
            }}
          />

          <span className="whitespace-nowrap text-xs tabular-nums text-zinc-500 shrink-0">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex w-1/4 justify-end items-center gap-2 shrink-0">
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-zinc-800"
            onClick={toggleMute}
          >
            <img
              src={isMute ? MuteIcon : VolumeIcon}
              alt={isMute ? 'Unmute' : 'Mute'}
              className="h-5 w-5"
            />
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = Number(e.target.value);
              if (audioRef.current) {
                audioRef.current.volume = newVolume;
              }
              setVolume(newVolume);
              if (newVolume > 0) {
                previousVolume.current = newVolume;
                setIsMute(false);
              }
            }}
            className="h-1 w-20 cursor-pointer accent-zinc-100"
          />
        </div>

        {track.stream.url && <audio ref={audioRef} src={track.stream.url} className="hidden" />}
      </div>
    </div>
  );
};
