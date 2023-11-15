import MainTitle from '../MainTitle/MainTitle';
import './Techs.css';

export default function Techs() {
  return (
    <section className='tech'>
      <MainTitle title={'Технологии'} />
      <h1 className='tech__title'>7 технологий</h1>
      <h1 className='tech__subtitle'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </h1>
      <div className='tech__items'>
        <div className='tech__item'>HTML</div>
        <div className='tech__item'>CSS</div>
        <div className='tech__item'>JS</div>
        <div className='tech__item'>React</div>
        <div className='tech__item'>Git</div>
        <div className='tech__item'>Express.js</div>
        <div className='tech__item'>mongoDB</div>
      </div>
    </section>
  );
}
