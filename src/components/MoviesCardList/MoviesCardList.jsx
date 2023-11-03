import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList() {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='33 слова о дизайне'
          duration='1ч 17м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='Киноальманах «100 лет дизайна»'
          duration='1ч 17м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='В погоне за Бенкси'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='Баския: Взрыв реальности'
          duration='1 ч 17 м'
        />
      </div>
      <button className='movies-card-list__button'>Ещё</button>
    </div>
  );
}
