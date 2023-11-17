import { useState } from 'react';
import { getFilmsApi } from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const getFilms = (keyWord) => {
    setIsLoading(true);
    getFilmsApi()
      .then((films) => {
        const filteredMovies = films.filter((film) =>
          film.nameRU.includes(keyWord)
        );
        setMovies(filteredMovies);
        setIsLoading(false);
        setIsSearchPerformed(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsSearchPerformed(true);
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });
  };

  return (
    <section className='movies'>
      <SearchForm onGetResult={getFilms} />
      {isLoading ? (
        <Preloader />
      ) : isSearchPerformed && movies.length ? (
        <MoviesCardList movies={movies} />
      ) : isSearchPerformed && error ? (
        <p className='movies__message movies__message_error'>{error}</p>
      ) : isSearchPerformed ? (
        <p className='movies__message'>Ничего не найдено</p>
      ) : null}
    </section>
  );
}
