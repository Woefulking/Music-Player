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
    <div className="flex items-center justify-between border-b border-zinc-800 p-3 sm:p-4 bg-zinc-950">
      {/* 1. ЛЕВАЯ ЧАСТЬ: Логотип. На мобилках сжимается до размера иконки, чтобы дать место поиску */}
      <div
        className="cursor-pointer flex flex-row items-center gap-3 w-auto sm:w-1/4 min-w-0 group shrink-0"
        onClick={() => navigate('/')}
      >
        <img
          src={LogoIcon}
          alt="logo"
          className="w-8 h-8 sm:w-10 sm:h-10 transition group-hover:scale-105"
        />
        <h1 className="font-bold text-lg sm:text-xl tracking-tight text-zinc-100 hidden sm:block truncate">
          Music Player
        </h1>
      </div>

      {/* 2. ЦЕНТРАЛЬНАЯ ЧАСТЬ: Поиск. Получает px-2 на мобилках, чтобы инпут не прилипал к краям */}
      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="relative flex flex-row items-center gap-2 w-full max-w-xs sm:max-w-md">
          <input
            type="text"
            value={searchedSong}
            onChange={(e) => setSearchedSong(e.target.value)}
            placeholder="Search..." // Укоротили плейсхолдер для мобилок, чтобы он не обрезался
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm outline-none transition focus:border-zinc-400 text-zinc-100"
          />

          <button
            onClick={handleSearchClick}
            className="cursor-pointer rounded-lg bg-zinc-100 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-zinc-900 transition hover:bg-zinc-300 active:scale-95 shrink-0"
          >
            <span>Search</span>
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

      <div className="w-auto sm:w-1/4 flex justify-end items-center shrink-0">
        <button
          onClick={() => navigate('/favorites')}
          className="cursor-pointer flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 p-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-zinc-100 active:scale-95 shadow-sm"
        >
          <img src={HeartIcon} alt="favorites" className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden md:inline">Favorites</span>
        </button>
      </div>
    </div>
  );
};
