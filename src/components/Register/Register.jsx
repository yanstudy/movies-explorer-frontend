import Auth from '../Auth/Auth';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import AuthButton from '../AuthButton/AuthButton';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import AuthError from '../AuthError/AuthError';
import { register } from '../../utils/MainApi';
import { useState } from 'react';

export default function Register({ onGetCurrentUser }) {
  const [error, setError] = useState('');
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: '',
      email: '',
      password: '',
    });

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    register(values)
      .then((user) => {
        console.log(user);
        onGetCurrentUser();
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setError('Пользователь с таким email уже существует');
        } else {
          setError('При регистрации пользователя произошла ошибка');
        }
      });
  };

  return (
    <form className='register' noValidate onSubmit={handleSubmitRegister}>
      <Auth title='Добро пожаловать!'>
        <AuthInput
          label={'Имя'}
          type='text'
          id='name'
          name='name'
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
        />
        <AuthInput
          label={'E-mail'}
          type='email'
          id='email'
          name='email'
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <AuthInput
          label={'Пароль'}
          type='password'
          id='password'
          name='password'
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />
        <AuthError error={error} />
      </Auth>
      <div className='register__button'>
        <AuthButton
          title='Зарегистрироваться'
          question='Уже зарегистрированы?'
          link='/signin'
          span='Войти'
          isActive={isValid}
        />
      </div>
    </form>
  );
}
