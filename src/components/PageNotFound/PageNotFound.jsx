import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  const navigate = useNavigate();
  const handleReturn = (e) => {
    navigate(-1);
  };
  return (
    <section className='page-not-found'>
      <h1 className='page-not-found__404'>404</h1>
      <h2 className='page-not-found__subtitle'>Страница не найдена</h2>
      <p className='page-not-found__button' onClick={handleReturn}>
        Назад
      </p>
    </section>
  );
}
