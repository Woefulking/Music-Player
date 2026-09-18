import { useEffect, useState } from 'react';
import type { AudioData } from '../types/types';
import { autocomplete } from '../api/autocomplete';

export const useAutocomplete = (searchedSong: string) => {
  const [suggestions, setSuggestions] = useState<AudioData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchedSong.trim().length < 1) {
      setSuggestions(null);
      setShowSuggestions(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const result = await autocomplete(searchedSong, controller.signal);

        setSuggestions(result);
        setShowSuggestions(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.error(error);
          return;
        }

        setSuggestions(null);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchedSong]);

  return {
    suggestions,
    showSuggestions,
    setShowSuggestions,
  };
};
