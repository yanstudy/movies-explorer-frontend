import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn }) {
  return (
    <div className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>
      {isLoggedIn && (
        <div className='header__movies-container'>
          <Link to='/movies' className='header__movies'>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='header__movies'>
            Сохранённые фильмы
          </Link>
        </div>
      )}
      <div className='header__account'>
        {isLoggedIn ? (
          <Link to='./profile' className='header__account-button'>
            Аккаунт
          </Link>
        ) : (
          <>
            <Link to='/signup' className='header__signup'>
              Регистрация
            </Link>
            <Link to='/signin' className='header__signin'>
              Войти
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
