import { useState } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { authorize } from '../../utils/MainApi';
import Auth from '../Auth/Auth';
import AuthButton from '../AuthButton/AuthButton';
import AuthError from '../AuthError/AuthError';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';
import { clearTheError } from '../../utils/utils';
import { EMAIL_PATTERN } from '../../utils/consts';

export default function Login({ onGetCurrentUser }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: '',
  });

  const handleSubmitLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    authorize(values)
      .then((data) => {
        console.log(data.message);
        onGetCurrentUser();
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setError('Вы ввели неправильный логин или пароль');
          clearTheError(setError);
        } else {
          setError('При авторизации произошла ошибка');
          clearTheError(setError);
        }
      })
      .finally(() => setIsLoading(false));
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
          pattern={EMAIL_PATTERN}
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
          isValid={isValid}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
