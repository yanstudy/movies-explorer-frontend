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
  const [keyWord, setKeyWord] = useState('');
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  // Поиск по фильмам
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const isCheckedValue = localStorage.getItem('isChecked') === 'true';
    const keyword = localStorage.getItem('keyword');

    if (!allMovies.length) {
      setIsChecked(isCheckedValue);
      setKeyWord(keyword);
      setMovies(storedMovies);
    } else {
      const filteredMovies = filterMovies(allMovies, keyWord);
      const shortMovies = getShortMovies(filteredMovies);

      if (isChecked) {
        setMovies(shortMovies);
        localStorage.setItem('movies', JSON.stringify(shortMovies));
      } else {
        setMovies(filteredMovies);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
      }
    }
    if (storedMovies.length) {
      setIsSearchPerformed(true);
    }
  }, [keyWord, isChecked, allMovies]);

  // Запросить фильмы с сервера и установить ключевое слово
  const handleSearchMovies = useCallback(
    (keyword) => {
      if (!allMovies.length) {
        setIsLoadingMovies(true);
        getFilmsApi()
          .then((films) => {
            setAllMovies(films);
            setKeyWord(keyword);
            setIsLoadingMovies(false);
            setIsSearchPerformed(true);
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
      }
      localStorage.setItem('keyword', keyword);
      setKeyWord(keyword);
    },
    [allMovies.length]
  );

  // Изменить состояние переключателя короткометражек
  const handleCheckboxChange = useCallback(() => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    localStorage.setItem('isChecked', !isChecked);
    const keyword = localStorage.getItem('keyword');

    if (!allMovies.length && keyword) {
      handleSearchMovies(keyWord);
    }
  }, [isChecked, allMovies.length, handleSearchMovies, keyWord]);

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
