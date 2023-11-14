import Auth from '../Auth/Auth';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import AuthButton from '../AuthButton/AuthButton';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import AuthError from '../AuthError/AuthError';

export default function Register() {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: '',
      email: '',
      password: '',
    });

  return (
    <form className='register' noValidate>
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
        <AuthError error='Что-то пошло не так...' />
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
