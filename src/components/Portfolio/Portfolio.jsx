import PortfolioItem from '../PortfolioItem/PortfolioItem';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <ul className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <PortfolioItem
        name={'Статичный сайт'}
        link={'https://github.com/yanstudy/how-to-learn'}
      />
      <PortfolioItem
        name={'Адаптивный сайт'}
        link={'https://yanstudy.github.io/russian-travel/'}
      />
      <PortfolioItem
        name={'Одностраничное приложение'}
        link={'https://yanstudy.nomoredomainsrocks.ru/'}
        withoutBorder
      />
    </ul>
  );
}
