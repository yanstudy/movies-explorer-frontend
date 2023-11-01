import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer__container'>
        <p className='footer__year'>© 2023</p>
        <div className='footer__items'>
          <p className='footer__yandex'>Яндекс.Практикум</p>
          <p className='footer__github'>Github</p>
        </div>
      </div>
    </div>
  );
}
