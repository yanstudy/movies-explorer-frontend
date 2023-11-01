import './MoviesCard.css';

export default function MoviesCard({ link, name, duration }) {
  return (
    <div className='moviescard'>
      <img src={link} alt={name} className='moviescard__image' />
      <div className='moviescard__info'>
        <p className='moviescard__name'>{name}</p>
        <p className='moviescard__duration'>{duration}</p>
      </div>
    </div>
  );
}
