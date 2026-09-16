import { useRef, useState } from 'react';
import type { Track } from 'types/types';
import { useClickOutside } from 'hooks/useClickOutside';
import { Autocomplete } from './Autocomplete';
import { useNavigate } from 'react-router-dom';
import { useAutocomplete } from 'hooks/useAutocomplete';
import LogoIcon from '/assets/icons/logo.svg';
import HeartIcon from '/assets/icons/heart.svg';

interface HeaderProps {
  onSelectSong: (track: Track, tracks: Track[]) => void;
}

export const Header = ({ onSelectSong }: HeaderProps) => {
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [searchedSong, setSearchedSong] = useState('');

  const { suggestions, showSuggestions, setShowSuggestions } = useAutocomplete(searchedSong);

  useClickOutside(dropdownRef, () => {
    setShowSuggestions(false);
  });

  const handleSearchClick = () => {
    if (!searchedSong.trim()) return;
    setShowSuggestions(false);

    navigate(`/search?q=${encodeURIComponent(searchedSong)}`);
  };

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-950">
      <div
        className="cursor-pointer flex flex-row items-center gap-3 w-1/4 min-w-0 group"
        onClick={() => navigate('/')}
      >
        <img src={LogoIcon} alt="logo" className="w-10 h-10 transition group-hover:scale-105" />
        <h1 className="font-bold text-xl tracking-tight text-zinc-100 hidden sm:block">
          Music Player
        </h1>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative flex flex-row items-center gap-2 w-full max-w-md">
          <input
            type="text"
            value={searchedSong}
            onChange={(e) => setSearchedSong(e.target.value)}
            placeholder="Search for a song..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm outline-none transition focus:border-zinc-400 text-zinc-100"
          />

          <button
            onClick={handleSearchClick}
            className="cursor-pointer rounded-lg bg-zinc-100 px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-300 active:scale-95 shrink-0"
          >
            Search
          </button>

          {showSuggestions && (
            <Autocomplete
              suggestions={suggestions}
              ref={dropdownRef}
              onSelect={onSelectSong}
              onClose={() => setShowSuggestions(false)}
            />
          )}
        </div>
      </div>

      <div className="w-1/4 flex justify-end items-center">
        <button
          onClick={() => navigate('/favorites')}
          className="cursor-pointer flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-zinc-100 active:scale-95 shadow-sm"
        >
          <img src={HeartIcon} alt="favorites" className="w-6 h-6" />
          <span className="hidden md:inline">Favorites</span>
        </button>
      </div>
    </div>
  );
};
