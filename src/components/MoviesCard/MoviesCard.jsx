import './MoviesCard.css';
import like from '../../images/like.svg';
import { useState } from 'react';

export default function MoviesCard({ link, name, duration }) {
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
      {isLiked && <img src={like} alt='like' className='moviescard__like' />}
      <div className='moviescard__info'>
        <p className='moviescard__name'>{name}</p>
        <p className='moviescard__duration'>{duration}</p>
      </div>
    </div>
  );
}
