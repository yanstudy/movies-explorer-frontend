import NavTab from '../NavTab/NavTab';
import './Promo.css';

export default function Promo() {
  return (
    <div className='promo'>
      <h1 className='promo__text'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </div>
  );
}
