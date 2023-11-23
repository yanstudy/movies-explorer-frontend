import { useState } from 'react';

export function useSearch(initialValues) {
  const [movies, setMovies] = useState(initialValues);
  const [isChecked, setIsChecked] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const performSearch = (e) => {
    setIsLoadingMovies(true);
    const filteredMovies = movies.filter(
      (film) =>
        film.nameRU.toLowerCase().includes(keyWord.toLowerCase()) ||
        film.nameEN.toLowerCase().includes(keyWord.toLowerCase())
    );
    const shortFilms = filteredMovies.filter((film) => film.duration <= 40);
    if (isChecked) {
      setMovies(shortFilms);
      setIsLoadingMovies(false);
      setIsSearchPerformed(true);
      localStorage.setItem('movies', JSON.stringify(shortFilms));
    } else {
      setMovies(filteredMovies);
      setIsLoadingMovies(false);
      setIsSearchPerformed(true);
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
    }

    localStorage.setItem('isChecked', isChecked);
    localStorage.setItem('keyword', keyWord);
  };

  return {
    movies,
    performSearch,
    isChecked,
    setIsChecked,
    setKeyWord,
    isSearchPerformed,
    isLoadingMovies,
  };
}
