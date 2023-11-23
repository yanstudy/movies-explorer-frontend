import { useSearch } from '../../hooks/useSearch';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

export default function Movies({
  onSearchMovies,
  isLoadingMovies,
  isSearchPerformed,
  movies,
  errorDuringSearchMovies,
  savedMovies,
  isChecked,
  onCheckboxChange,
  addNewMovieToList,
  onRemoveMovie,
}) {
  // const {
  //   movies,
  //   performSearch,
  //   isChecked,
  //   setIsChecked,
  //   setKeyWord,
  //   isSearchPerformed,
  //   isLoadingMovies,
  // } = useSearch(movies);

  return (
    <section className='movies'>
      <SearchForm
        onGetResult={onSearchMovies}
        isChecked={isChecked}
        onCheckboxChange={onCheckboxChange}
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
