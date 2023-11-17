import './Profile.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useContext, useRef, useState } from 'react';
import { editUser } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({ quitCb, onEditUser }) {
  const [isEditing, setIsEditiong] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();
  const user = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: user && user.name ? user.name : '',
      email: user && user.email ? user.email : '',
    });

  const handleEditingPossible = (e) => {
    setIsEditiong(true);
    inputRef.current.focus();
  };

  const handleSubmitEditing = (e) => {
    e.preventDefault();
    setError('');
    editUser(values)
      .then((newUserData) => {
        onEditUser(newUserData);
        setIsEditiong(false);
        resetForm();
        setValues(newUserData);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setError('Пользователь с таким email уже существует');
        } else {
          setError('При обновлении профиля произошла ошибка');
        }
      });
  };

  const handleQuit = (e) => {
    e.preventDefault();
    quitCb();
    setIsEditiong(false);
  };

  return (
    <section className='profile'>
      <h3 className='profile__hello'>{`Привет, ${user.name}!`}</h3>
      <form className='profile__form' noValidate onSubmit={handleSubmitEditing}>
        <label htmlFor='name' className='profile__label'>
          Имя
          <input
            className='profile__input'
            value={values.name}
            id='name'
            name='name'
            type='text'
            minLength={2}
            maxLength={30}
            onChange={handleChange}
            ref={inputRef}
            readOnly={isEditing ? false : true}
            required
          />
          <span className='profile__input-error'>{errors.name}</span>
        </label>
        <label htmlFor='email' className='profile__label'>
          E-mail
          <input
            className='profile__input'
            value={values.email}
            id='email'
            name='email'
            type='email'
            onChange={handleChange}
            readOnly={isEditing ? false : true}
            required
          />
          <span className='profile__input-error'>{errors.email}</span>
        </label>

        {isEditing ? (
          <div className='profile__save-button-container'>
            <span className='profile__api-error'>{error}</span>
            <button
              className={`profile__save-button ${
                !isValid ? 'profile__save-button_inactive' : ''
              }`}
              type='submit'
              disabled={!isValid}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <>
            <p className='profile__edit-button' onClick={handleEditingPossible}>
              Редактировать
            </p>
            <button
              className='profile__edit-button profile__edit-button_quit'
              onClick={handleQuit}
              type='button'
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}
