import Auth from '../Auth/Auth';
import AuthButton from '../AuthButton/AuthButton';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';

export default function Login() {
  return (
    <div className='login'>
      <Auth title={'Рады видеть!'}>
        <AuthInput label={'E-mail'} type='email' id='email' />
        <AuthInput label={'Пароль'} type='password' id='password' />
      </Auth>
      <div className='login__button'>
        <AuthButton
          title='Войти'
          question='Ещё не зарегистрированы?'
          link='/signup'
          span='Регистрация'
        />
      </div>
    </div>
  );
}
