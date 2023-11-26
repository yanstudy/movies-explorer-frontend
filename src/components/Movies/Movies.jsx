import { useCallback, useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { getFilmsApi } from '../../utils/MoviesApi';
import { filterMovies, getShortMovies } from '../../utils/utils';

export default function Movies({
  savedMovies,
  addNewMovieToList,
  onRemoveMovie,
}) {
  const [errorDuringSearchMovies, setErrorDuringSearchMovies] = useState('');
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [unfilteredMovies, setUnfilteredMovies] = useState([]);

  // Поиск по фильмам
  const handleSearchMovies = (keyword) => {
    setIsLoadingMovies(true);
    getFilmsApi()
      .then((films) => {
        const filteredMovies = filterMovies(films, keyword);
        const shortFilms = getShortMovies(films);
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
        localStorage.setItem('keyword', keyword);
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
  };

  // Изменить состояние переключателя короткометражек
  const handleCheckboxChange = useCallback(() => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    localStorage.setItem('isChecked', !isChecked);

    if (isChecked) {
      const keyword = localStorage.getItem('keyword') || '';
      const filteredMovies = filterMovies(unfilteredMovies, keyword);
      setMovies(filteredMovies);
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
    } else {
      setMovies((prevMovies) => {
        const shortMovies = getShortMovies(prevMovies);
        setUnfilteredMovies(prevMovies);
        localStorage.setItem('movies', JSON.stringify(shortMovies));
        return shortMovies;
      });
    }
  }, [isChecked, unfilteredMovies]);

  // Проверить есть ли параметры поиска в localStorage. Если есть - взять оттуда
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const isCheckedValue = localStorage.getItem('isChecked') === 'true';
    setMovies(storedMovies);
    setUnfilteredMovies(storedMovies);
    setIsChecked(isCheckedValue);
    if (storedMovies.length) {
      setIsSearchPerformed(true);
    }
  }, []);

  return (
    <section className='movies'>
      <SearchForm
        onGetResult={handleSearchMovies}
        isChecked={isChecked}
        onCheckboxChange={handleCheckboxChange}
        isLoadingMovies={isLoadingMovies}
      />
      {isLoadingMovies ? (
        <Preloader />
      ) : isSearchPerformed && movies.length ? (
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          saved={false}
          addNewMovieToList={addNewMovieToList}
          onRemoveMovie={onRemoveMovie}
        />
      ) : isSearchPerformed && errorDuringSearchMovies ? (
        <p className='movies__message movies__message_error'>
          {errorDuringSearchMovies}
        </p>
      ) : isSearchPerformed ? (
        <p className='movies__message'>Ничего не найдено</p>
      ) : null}
    </section>
  );
}
