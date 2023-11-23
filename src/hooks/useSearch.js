import { useCallback, useState } from 'react';

export function useSearch() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const performSearch = (keyWord) => {
    setSearchedMovies((prevMovies) => {
      const filteredMovies = prevMovies.filter(
        (film) =>
          film.nameRU.toLowerCase().includes(keyWord.toLowerCase()) ||
          film.nameEN.toLowerCase().includes(keyWord.toLowerCase())
      );
      const shortFilms = filteredMovies.filter((film) => film.duration <= 40);
      if (isChecked) {
        localStorage.setItem('movies', JSON.stringify(shortFilms));
        return shortFilms;
      } else {
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        return filteredMovies;
      }
    });

    localStorage.setItem('isChecked', isChecked);
    localStorage.setItem('keyword', keyWord);
  };

  const handleCheckboxChange = useCallback(() => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    localStorage.setItem('isChecked', !isChecked);

    setSearchedMovies((prevMovies) => {
      const filteredMovies = prevMovies.filter((film) => film.duration <= 40);
      return filteredMovies;
    });
  }, [isChecked]);

  return {
    searchedMovies,
    performSearch,
    handleCheckboxChange,
    isChecked,
    setIsChecked,
    setSearchedMovies,
  };
}
