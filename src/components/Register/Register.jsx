import Auth from '../Auth/Auth';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import AuthButton from '../AuthButton/AuthButton';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

export default function Register() {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      name: '',
      email: '',
      password: '',
    });

  return (
    <form className='register'>
      <Auth title='Добро пожаловать!'>
        <AuthInput
          label={'Имя'}
          type='text'
          id='name'
          name='name'
          value={values.name}
          error={errors.name}
          onChange={handleChange}
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
      </Auth>
      <div className='register__button'>
        <AuthButton
          title='Зарегистрироваться'
          question='Уже зарегистрированы?'
          link='/signin'
          span='Войти'
        />
      </div>
    </form>
  );
}
