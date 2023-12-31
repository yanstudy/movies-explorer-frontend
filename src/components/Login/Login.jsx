import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Auth from '../Auth/Auth';
import AuthButton from '../AuthButton/AuthButton';
import AuthError from '../AuthError/AuthError';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';

export default function Login() {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      email: '',
      password: '',
    });

  return (
    <form className='login' noValidate>
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
        <AuthError error='Что-то пошло не так...' />
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
