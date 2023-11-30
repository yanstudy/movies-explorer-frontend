import './MoviesCard.css';
import like from '../../images/like.svg';
import deleteIcon from '../../images/delete-card.svg';

import { memo, useState } from 'react';
import { deleteMovie, saveMovie } from '../../utils/MainApi';
import TrailerPopup from '../TrailerPopup/TrailerPopup';
import { MAIN_DOMAIN_MOVIES } from '../../utils/consts';

export const MoviesCard = memo(
  ({
    movie,
    savedMovies,
    saved,
    addNewMovieToList,
    onRemoveMovie,
    mobileWidth,
  }) => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const isLiked = savedMovies.find((el) => el.movieId === movie.id);

    const addLike = (e) => {
      saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: MAIN_DOMAIN_MOVIES + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: MAIN_DOMAIN_MOVIES + movie.image.previewUrl.split('\n/')[0],
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
        .then((data) => {
          addNewMovieToList(data);
        })
        .catch((err) => console.log(err));
    };

    const deleteLike = (e) => {
      const currentMovie = savedMovies.find((el) => el.movieId === movie.id);
      const movieIdToDelete = saved ? movie._id : currentMovie._id;
      deleteMovie(movieIdToDelete)
        .then((data) => {
          console.log(data.message);
          onRemoveMovie(movieIdToDelete);
        })
        .catch((err) => console.log(err));
    };

    const getDuration = (duration) => {
      const hours = Math.round(duration / 60);
      const minutes = duration % 60;

      const hoursString = hours !== 0 ? `${hours}ч` : '';
      const minutesString = minutes !== 0 ? `${minutes}м` : '';
      return `${hoursString} ${minutesString}`;
    };

    const openTrailer = (e) => {
      if (e.target === e.currentTarget) {
        setIsTrailerOpen(true);
      }
    };

    const closeTrailer = (e) => {
      setIsTrailerOpen(false);
    };

    return (
      <>
        <div className='moviescard'>
          <img
            src={`${
              !saved ? MAIN_DOMAIN_MOVIES + movie.image.url : movie.image
            }`}
            alt={movie.nameRU}
            className='moviescard__image'
            onClick={openTrailer}
          />
          {isLiked && (
            <img
              src={like}
              alt='like'
              className='moviescard__like'
              onClick={deleteLike}
            />
          )}
          {!saved && !isLiked && (
            <button
              type='button'
              className='moviescard__save-button'
              onClick={addLike}
            >
              Сохранить
            </button>
          )}
          {saved && (
            <img
              src={deleteIcon}
              alt='delete icon'
              className='moviescard__delete'
              onClick={deleteLike}
            />
          )}
          <div className='moviescard__info'>
            <p className='moviescard__name'>{movie.nameRU}</p>
            <p className='moviescard__duration'>
              {getDuration(movie.duration)}
            </p>
          </div>
        </div>
        {isTrailerOpen && (
          <TrailerPopup
            trailerLink={movie.trailerLink}
            onClose={closeTrailer}
            isTrailerOpen={isTrailerOpen}
            mobileWidth={mobileWidth}
          />
        )}
      </>
    );
  }
);
