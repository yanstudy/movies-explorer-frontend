import Logo from '../Logo/Logo';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ isLoggedIn }) {
  const setActive = ({ isActive }) =>
    isActive ? 'header__movies header__movies_active' : 'header__movies';

  return (
    <header className='header'>
      <Logo />
      {isLoggedIn && (
        <div className='header__movies-container'>
          <NavLink to='/movies' className={setActive}>
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className={setActive}>
            Сохранённые фильмы
          </NavLink>
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
    </header>
  );
}
