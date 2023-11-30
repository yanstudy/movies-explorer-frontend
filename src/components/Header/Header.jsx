import { useState } from 'react';
import Logo from '../Logo/Logo';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';

export default function Header({ user }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isMobileWidth } = useResize();

  const setActive = ({ isActive }) =>
    isActive ? 'header__movies header__movies_active' : 'header__movies';

  const openMenu = (e) => {
    setMenuOpen(true);
  };

  const closeMenu = (e) => {
    setMenuOpen(false);
  };

  return (
    <header className='header'>
      <Logo />
      {isMobileWidth && user?.email && (
        <button
          className='header__burger'
          type='button'
          onClick={openMenu}
        ></button>
      )}

      {user?.email ? (
        <div
          className={`${isMenuOpen ? 'header__menu-open' : 'header__wrapper'}`}
        >
          <button
            className='header__close-icon'
            type='button'
            onClick={closeMenu}
            style={{ display: !isMenuOpen ? 'none' : 'block' }}
          />

          <div className='header__movies-container'>
            <NavLink
              to='/'
              style={{ display: !isMenuOpen ? 'none' : 'block' }}
              className={setActive}
              onClick={closeMenu}
            >
              Главная
            </NavLink>
            <NavLink to='/movies' className={setActive} onClick={closeMenu}>
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className={setActive}
              onClick={closeMenu}
            >
              Сохранённые фильмы
            </NavLink>
          </div>

          <div className='header__account'>
            {user?.email && (
              <Link
                to='./profile'
                className='header__account-button'
                onClick={closeMenu}
              >
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
