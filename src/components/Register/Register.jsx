import Auth from '../Auth/Auth';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';
import AuthButton from '../AuthButton/AuthButton';

export default function Register() {
  return (
    <div className='register'>
      <Auth title='Добро пожаловать!'>
        <AuthInput label={'Имя'} type='text' id='name' />
        <AuthInput label={'E-mail'} type='email' id='email' />
        <AuthInput label={'Пароль'} type='password' id='password' />
      </Auth>
      <div className='register__button'>
        <AuthButton
          title='Зарегистрироваться'
          question='Уже зарегистрированы?'
          link='/signin'
          span='Войти'
        />
      </div>
    </div>
  );
}
