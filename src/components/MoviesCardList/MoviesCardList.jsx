import { useEffect, useState } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  movies,
  savedMovies,
  saved,
  addNewMovieToList,
  onRemoveMovie,
}) {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [destkopWidth, setDesktopWidth] = useState(false);
  const [averageWidth, setAverageWidth] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);
  const [currentAmountOfMovies, setCurrentAmountOfMovies] = useState(11);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setCurrentWidth(newWidth);

      if (newWidth >= 1060) {
        setDesktopWidth(true);
        setAverageWidth(false);
        setMobileWidth(false);
      } else if (newWidth <= 1060 && newWidth > 555) {
        setDesktopWidth(false);
        setAverageWidth(true);
        setMobileWidth(false);
        setCurrentAmountOfMovies(7);
      } else if (newWidth <= 555) {
        setDesktopWidth(false);
        setAverageWidth(false);
        setMobileWidth(true);
        setCurrentAmountOfMovies(4);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addMoreCards = () => {
    if (destkopWidth) {
      setCurrentAmountOfMovies((prevAmount) => prevAmount + 3);
    } else if (averageWidth || mobileWidth) {
      setCurrentAmountOfMovies((prevAmount) => prevAmount + 2);
    }
  };

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
