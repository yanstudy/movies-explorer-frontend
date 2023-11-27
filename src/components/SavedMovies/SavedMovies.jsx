import { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export const SavedMovies = ({
  showSavedMovies,
  movies,
  saved,
  savedMovies,
  onRemoveMovie,
  isChecked,
  onSearchMyMovies,
  onCheckboxChange,
  isSearchPerformed,
}) => {
  useEffect(() => {
    showSavedMovies();
  }, [showSavedMovies]);

  return (
    <section className='saved-movies'>
      <SearchForm
        isChecked={isChecked}
        onGetResult={onSearchMyMovies}
        onCheckboxChange={onCheckboxChange}
        saved={saved}
      />
      {isSearchPerformed && !savedMovies.length ? (
        <p className='movies__message'>Ничего не найдено</p>
      ) : (
        <MoviesCardList
          savedMovies={savedMovies}
          saved={saved}
          onRemoveMovie={onRemoveMovie}
        />
      )}
    </section>
  );
};
