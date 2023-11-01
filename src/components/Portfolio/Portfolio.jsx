import PortfolioItem from '../PortfolioItem/PortfolioItem';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <PortfolioItem
        name={'Статичный сайт'}
        link={'https://github.com/yanstudy/how-to-learn'}
      />
      <PortfolioItem
        name={'Адаптивный сайт'}
        link={'https://github.com/yanstudy/how-to-learn'}
      />
      <PortfolioItem
        name={'Одностраничное приложение'}
        link={'https://github.com/yanstudy/how-to-learn'}
        withoutBorder
      />
    </div>
  );
}
