import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  movies,
  savedMovies,
  saved,
  addNewMovieToList,
  onRemoveMovie,
}) {
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        {!saved
          ? movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  saved={saved}
                  savedMovies={savedMovies}
                  addNewMovieToList={addNewMovieToList}
                  onRemoveMovie={onRemoveMovie}
                />
              );
            })
          : savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie._id}
                  movie={movie}
                  saved={saved}
                  savedMovies={savedMovies}
                  onRemoveMovie={onRemoveMovie}
                />
              );
            })}
      </div>
      {!saved && (
        <button type='button' className='movies-card-list__button'>
          Ещё
        </button>
      )}
    </section>
  );
}
