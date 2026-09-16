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
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMute: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onChangeVolume: (volume: number) => void;
  onSeekTime: (time: number) => void;
}

export const Player = ({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMute,
  onPrevious,
  onNext,
  onTogglePlay,
  onToggleMute,
  onChangeVolume,
  onSeekTime,
}: PlayerProps) => {
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
            onClick={onTogglePlay}
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
            onChange={(e) => onSeekTime(Number(e.target.value))}
          />

          <span className="whitespace-nowrap text-xs tabular-nums text-zinc-500 shrink-0">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex w-1/4 justify-end items-center gap-2 shrink-0">
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-zinc-800"
            onClick={onToggleMute}
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
            onChange={(e) => onChangeVolume(Number(e.target.value))}
            className="h-1 w-20 cursor-pointer accent-zinc-100"
          />
        </div>
      </div>
    </div>
  );
};
