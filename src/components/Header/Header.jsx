import { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
const currentWidth = window.innerWidth;

export default function Header({ isLoggedIn }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobileWidth, setMobileWidth] = useState(false);

  const setActive = ({ isActive }) =>
    isActive ? 'header__movies header__movies_active' : 'header__movies';

  const toggleMenu = (e) => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (currentWidth <= 768) {
      setMobileWidth(true);
    }

    window.addEventListener('resize', () => {
      if (currentWidth <= 768) {
        setMobileWidth(true);
      }
    });
  }, []);

  return (
    <header className='header'>
      <Logo />
      {isMobileWidth && isLoggedIn && (
        <button
          className='header__burger'
          type='button'
          onClick={toggleMenu}
        ></button>
      )}

      {isLoggedIn ? (
        <div
          className={`${isMenuOpen ? 'header__menu-open' : 'header__wrapper'}`}
        >
          <button
            className='header__close-icon'
            type='button'
            onClick={toggleMenu}
            style={{ display: !isMenuOpen ? 'none' : 'block' }}
          />

          <div className='header__movies-container'>
            <NavLink
              to='/'
              style={{ display: !isMenuOpen ? 'none' : 'block' }}
              className={setActive}
            >
              Главная
            </NavLink>
            <NavLink to='/movies' className={setActive}>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className={setActive}>
              Сохранённые фильмы
            </NavLink>
          </div>

          <div className='header__account'>
            {isLoggedIn && (
              <Link to='./profile' className='header__account-button'>
                Аккаунт
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className='header__account'>
          <Link to='/signup' className='header__signup'>
            Регистрация
          </Link>
          <Link to='/signin' className='header__signin'>
            Войти
          </Link>
        </div>
      )}
    </header>
  );
}
