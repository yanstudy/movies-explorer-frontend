import { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({
  showSavedMovies,
  movies,
  savedMovies,
  saved,
  onRemoveMovie,
  isChecked,
  onSearchMyMovies,
}) {
  useEffect(() => {
    showSavedMovies();
  }, []);

  return (
    <section className='saved-movies'>
      <SearchForm
        saved={saved}
        isChecked={isChecked}
        onGetResult={onSearchMyMovies}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        saved={saved}
        onRemoveMovie={onRemoveMovie}
      />
    </section>
  );
}
