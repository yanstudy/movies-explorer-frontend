import { useState } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { authorize, getCurrentuser } from '../../utils/MainApi';
import Auth from '../Auth/Auth';
import AuthButton from '../AuthButton/AuthButton';
import AuthError from '../AuthError/AuthError';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';

export default function Login({ onGetCurrentUser }) {
  const [error, setError] = useState('');
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      email: '',
      password: '',
    });

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    authorize(values)
      .then((data) => {
        console.log(data.message);
        onGetCurrentUser();
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setError('Вы ввели неправильный логин или пароль');
        } else {
          setError('При авторизации произошла ошибка');
        }
      });
  };

  return (
    <form className='login' noValidate onSubmit={handleSubmitLogin}>
      <Auth title='Рады видеть!'>
        <AuthInput
          label='E-mail'
          type='email'
          id='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <AuthInput
          label='Пароль'
          type='password'
          id='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <AuthError error={error} />
      </Auth>
      <div className='login__button'>
        <AuthButton
          title='Войти'
          question='Ещё не зарегистрированы?'
          link='/signup'
          span='Регистрация'
          isActive={isValid}
        />
      </div>
    </form>
  );
}
