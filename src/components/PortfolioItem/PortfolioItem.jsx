import './PortfolioItem.css';
import icon from '../../images/icon.svg';

export default function PortfolioItem({ name, link, withoutBorder }) {
  return (
    <div
      className={`portfolio-item ${
        withoutBorder ? 'portfolio-item_border' : ''
      }`}
    >
      <a href={link} className='portfolio-item__link'>
        <h3 className='portfolio-item__name'>{name}</h3>
        <img
          src={icon}
          alt='Икона для ссылки'
          className='portfolio-item__icon'
        />
      </a>
    </div>
  );
}
