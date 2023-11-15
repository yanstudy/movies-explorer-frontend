import './MoviesCard.css';
import like from '../../images/like.svg';
import deleteIcon from '../../images/delete-card.svg';

import { useState } from 'react';

export default function MoviesCard({ link, name, duration, saved }) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e) => {
    setIsLiked(!isLiked);
  };

  return (
    <div className='moviescard'>
      <img
        src={link}
        alt={name}
        className='moviescard__image'
        onClick={toggleLike}
      />
      {!saved && isLiked && (
        <img src={like} alt='like' className='moviescard__like' />
      )}
      {!saved && (
        <button type='button' className='moviescard__save-button'>
          Сохранить
        </button>
      )}
      {saved && (
        <img
          src={deleteIcon}
          alt='delete icon'
          className='moviescard__delete'
        />
      )}
      <div className='moviescard__info'>
        <p className='moviescard__name'>{name}</p>
        <p className='moviescard__duration'>{duration}</p>
      </div>
    </div>
  );
}
