import './Profile.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useState } from 'react';
import AuthButton from '../AuthButton/AuthButton';

export default function Profile() {
  const [isEditing, setIsEditiong] = useState(false);
  const [inActive, setInActive] = useState(false);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: 'Артур',
      email: '123@mail.ru',
    });

  return (
    <div className='profile'>
      <h3 className='profile__hello'>{`Привет, ${values.name}!`}</h3>
      <form className='profile__form' noValidate>
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
          />
          <span className='profile__input-error'>{errors.email}</span>
        </label>

        {isEditing ? (
          <div className='profile__save-button-container'>
            <span className='profile__api-error'>
              При обновлении профиля произошла ошибка.
            </span>
            <button
              className={`profile__save-button ${
                inActive ? 'profile__save-button_inactive' : ''
              }`}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <>
            <p className='profile__edit-button'>Редактировать</p>
            <button className='profile__edit-button profile__edit-button_quit '>
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </div>
  );
}
