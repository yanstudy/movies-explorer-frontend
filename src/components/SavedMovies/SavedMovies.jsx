import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <div className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}
