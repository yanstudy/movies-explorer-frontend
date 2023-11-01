import './AboutMe.css';
import MainTitle from '../MainTitle/MainTitle';
import photo from '../../images/photo.png';

export default function AboutMe() {
  return (
    <div className='aboutme'>
      <MainTitle title={'Студент'} />
      <div className='aboutme__container'>
        <div className='aboutme__info'>
          <h2 className='aboutme__name'>Артур</h2>
          <h3 className='aboutme__job'>Фронтенд-разработчик, 30 лет</h3>
          <p className='aboutme__paragraph'>
            Я родился в Караганде, живу в Твери. Закончил физико-технический
            факультет ТвГУ. У меня есть жена, дочь и сын. Я люблю слушать и
            писать музыку, а ещё увлекаюсь большим теннисом. Недавно начал
            кодить.
          </p>
          <a href='https://github.com/yanstudy/' className='aboutme__link'>
            Github
          </a>
        </div>
        <img src={photo} alt='Фотография студента' className='aboutme__photo' />
      </div>
    </div>
  );
}
