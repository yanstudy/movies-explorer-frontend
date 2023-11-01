import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList() {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1ч 17м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='KLkjhk.jhk.jhk.jhk.jhkjhkjhkljhkjhkjhkhkjhkjhkjhkjhkjhkjhkjhkjh'
          duration='1ч 17м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
        <MoviesCard
          link='https://www.tutu.ru/file/4/8d300c3b81aec38fc3329d41f01ebc60/'
          name='хуй'
          duration='1 ч 17 м'
        />
      </div>
      <button className='movies-card-list__button'>Ещё</button>
    </div>
  );
}
