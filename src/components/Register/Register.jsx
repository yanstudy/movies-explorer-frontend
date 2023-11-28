import Auth from '../Auth/Auth';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import AuthButton from '../AuthButton/AuthButton';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import AuthError from '../AuthError/AuthError';
import { register } from '../../utils/MainApi';
import { useState } from 'react';
import { clearTheError } from '../../utils/utils';

export default function Register({ onGetCurrentUser }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmitRegister = (e) => {
    setIsLoading(true);
    e.preventDefault();
    register(values)
      .then((user) => {
        onGetCurrentUser(user);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setError('Пользователь с таким email уже существует');
          clearTheError(setError);
        } else {
          setError('При регистрации пользователя произошла ошибка');
          clearTheError(setError);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form className='register' onSubmit={handleSubmitRegister}>
      <Auth title='Добро пожаловать!'>
        <AuthInput
          label={'Имя'}
          type='text'
          id='name'
          name='name'
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          pattern='^[a-zA-Zа-яА-Я]+[a-zA-Zа-яА-Я\- ]*$'
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
          isActive={isValid || isLoading}
        />
      </div>
    </form>
  );
}
