import { useEffect, useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { getFilmsApi } from '../../utils/MoviesApi';

export default function Movies({
  savedMovies,
  addNewMovieToList,
  onRemoveMovie,
}) {
  const [movies, setMovies] = useState([]);
  const [errorDuringSearchMovies, setErrorDuringSearchMovies] = useState('');
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const {
    searchedMovies,
    performSearch,
    handleCheckboxChange,
    isChecked,
    setIsChecked,
    setSearchedMovies,
  } = useSearch(movies);

  const handleSearchMovies = (keyword) => {
    setIsLoadingMovies(true);
    getFilmsApi()
      .then((films) => {
        setIsLoadingMovies(false);
        setIsSearchPerformed(true);
        setSearchedMovies(films);
      })
      .catch((err) => {
        setIsLoadingMovies(false);
        setIsSearchPerformed(true);
        setErrorDuringSearchMovies(
          `Во время запроса произошла ошибка. 
           Возможно, проблема с соединением или сервер недоступен. 
           Подождите немного и попробуйте ещё раз`
        );
      });
    performSearch(keyword);
  };

  // Проверить есть ли параметры поиска в localStorage. Если есть - взять оттуда
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const isCheckedValue = localStorage.getItem('isChecked') === 'true';
    if (storedMovies.length) {
      setIsChecked(isCheckedValue);
    }
  }, []);

  return (
    <section className='movies'>
      <SearchForm
        onGetResult={handleSearchMovies}
        isChecked={isChecked}
        onCheckboxChange={handleCheckboxChange}
      />
      {isLoadingMovies ? (
        <Preloader />
      ) : isSearchPerformed && searchedMovies.length ? (
        <MoviesCardList
          movies={searchedMovies}
          savedMovies={savedMovies}
          saved={false}
          addNewMovieToList={addNewMovieToList}
          onRemoveMovie={onRemoveMovie}
        />
      ) : isSearchPerformed && errorDuringSearchMovies ? (
        <p className='movies__message movies__message_error'>
          {errorDuringSearchMovies}
        </p>
      ) : isSearchPerformed && !searchedMovies.length ? (
        <p className='movies__message'>Ничего не найдено</p>
      ) : null}
    </section>
  );
}
