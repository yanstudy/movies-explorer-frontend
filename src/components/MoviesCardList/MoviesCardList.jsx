import { useEffect, useState } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useResize } from '../../hooks/useResize';
import {
  AMOUNT_OF_MOVIES_AVERAGE,
  AMOUNT_OF_MOVIES_DESKTOP,
  AMOUNT_OF_MOVIES_MOBILE,
} from '../../utils/consts';

export default function MoviesCardList({
  movies,
  savedMovies,
  saved,
  addNewMovieToList,
  onRemoveMovie,
}) {
  const [currentAmountOfMovies, setCurrentAmountOfMovies] = useState(
    AMOUNT_OF_MOVIES_DESKTOP
  );
  const { isDesktopWidth, isAverageWidth, isMobileWidth } = useResize();

  const addMoreCards = () => {
    if (isDesktopWidth) {
      setCurrentAmountOfMovies((prevAmount) => prevAmount + 3);
    } else if (isAverageWidth || isMobileWidth) {
      setCurrentAmountOfMovies((prevAmount) => prevAmount + 2);
    }
  };

  useEffect(() => {
    setCurrentAmountOfMovies(
      isDesktopWidth
        ? AMOUNT_OF_MOVIES_DESKTOP
        : isAverageWidth
        ? AMOUNT_OF_MOVIES_AVERAGE
        : isMobileWidth
        ? AMOUNT_OF_MOVIES_MOBILE
        : AMOUNT_OF_MOVIES_DESKTOP
    );
  }, [isDesktopWidth, isAverageWidth, isMobileWidth]);

  const hasMoreMovies = !saved
    ? currentAmountOfMovies < movies.length
    : currentAmountOfMovies < savedMovies.length;

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        {!saved
          ? movies.map((movie, index) => {
              return index <= currentAmountOfMovies ? (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  saved={saved}
                  savedMovies={savedMovies}
                  addNewMovieToList={addNewMovieToList}
                  onRemoveMovie={onRemoveMovie}
                  mobileWidth={isMobileWidth}
                />
              ) : null;
            })
          : savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie._id}
                  movie={movie}
                  saved={saved}
                  savedMovies={savedMovies}
                  onRemoveMovie={onRemoveMovie}
                  mobileWidth={isMobileWidth}
                />
              );
            })}
      </div>
      {!saved && hasMoreMovies ? (
        <button
          type='button'
          className='movies-card-list__button'
          onClick={addMoreCards}
        >
          Ещё
        </button>
      ) : null}
    </section>
  );
}
