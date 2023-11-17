import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ saved, movies }) {
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              link={`https://api.nomoreparties.co/${movie.image.url}`}
              name={movie.nameRU}
              duration={movie.duration}
              saved={saved}
              key={movie.id}
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
