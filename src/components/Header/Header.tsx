import { useRef, useState } from 'react';
import type { Track } from '../../types/types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Autocomplete } from './Autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAutocomplete } from '../../hooks/useAutocomplete';

interface HeaderProps {
  onSearch: (query: string) => void;
  onSelectSong: (track: Track, tracks: Track[]) => void;
}

export const Header = ({ onSearch, onSelectSong }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [searchedSong, setSearchedSong] = useState('');

  const { suggestions, showSuggestions, setShowSuggestions } = useAutocomplete(searchedSong);

  useClickOutside(dropdownRef, () => {
    setShowSuggestions(false);
  });

  const handleSearchClick = () => {
    onSearch(searchedSong);
    setShowSuggestions(false);

    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  return (
    <div className="flex border-b border-zinc-800 p-4">
      <div className="flex-1 flex justify-center">
        <div className="relative flex flex-row items-center gap-2">
          <input
            type="text"
            value={searchedSong}
            onChange={(e) => setSearchedSong(e.target.value)}
            placeholder="Search for a song..."
            className="w-full max-w-75 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 outline-none transition focus:border-zinc-400"
          />

          <button
            onClick={handleSearchClick}
            className="cursor-pointer rounded-lg bg-zinc-100 px-5 py-2 font-medium text-zinc-900 transition hover:bg-zinc-300"
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
    </div>
  );
};
