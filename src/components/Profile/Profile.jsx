import './Profile.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useEffect, useRef, useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: 'Артур',
      email: '123@mail.ru',
    });

  const nameInputRef = useRef(null);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className='profile'>
      <h3 className='profile__hello'>{`Привет, ${values.name}!`}</h3>
      <form className='profile__form' noValidate>
        {isEditing ? (
          <>
            <label htmlFor='name' className='profile__label'>
              Имя
              <input
                className='profile__input'
                value={values.name}
                id='name'
                name='name'
                type='text'
                onChange={handleChange}
                ref={nameInputRef}
              />
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
            </label>
          </>
        ) : (
          <>
            <label htmlFor='name' className='profile__label'>
              Имя
              <input
                className='profile__input'
                value={values.name}
                id='name'
                name='name'
                type='text'
                readOnly
              />
            </label>
            <label htmlFor='email' className='profile__label'>
              E-mail
              <input
                className='profile__input'
                value={values.email}
                id='email'
                name='email'
                type='email'
                readOnly
              />
            </label>
          </>
        )}
        <p className='profile__edit-button' onClick={handleEditClick}>
          Редактировать
        </p>
        <button className='profile__edit-button profile__edit-button_quit '>
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
