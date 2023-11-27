import './MoviesCard.css';
import like from '../../images/like.svg';
import deleteIcon from '../../images/delete-card.svg';

import { memo, useEffect, useState } from 'react';
import { deleteMovie, saveMovie } from '../../utils/MainApi';
import TrailerPopup from '../TrailerPopup/TrailerPopup';

export const MoviesCard = memo(
  ({
    movie,
    savedMovies,
    saved,
    addNewMovieToList,
    onRemoveMovie,
    mobileWidth,
  }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const addLike = (e) => {
      saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${
          movie.image.previewUrl.split('\n/')[0]
        }`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
        .then((data) => {
          setIsLiked(true);
          addNewMovieToList(data);
        })
        .catch((err) => console.log(err));
    };

    const deleteLike = (e) => {
      const currentMovie = savedMovies.find((el) => el.movieId === movie.id);
      const movieIdToDelete = saved ? movie._id : currentMovie._id;
      deleteMovie(movieIdToDelete)
        .then((data) => {
          setIsLiked(false);
          console.log(data.message);
          onRemoveMovie(movieIdToDelete);
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      if (!saved) {
        const isAlreadyLiked = savedMovies.find(
          (el) => el.movieId === movie.id
        );
        if (isAlreadyLiked) {
          setIsLiked(true);
        }
      }
    }, [saved, movie.id, savedMovies]);

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
        <div className='moviescard' onClick={openTrailer}>
          <img
            src={`${
              !saved
                ? 'https://api.nomoreparties.co/' + movie.image.url
                : movie.image
            }`}
            alt={movie.nameRU}
            className='moviescard__image'
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
