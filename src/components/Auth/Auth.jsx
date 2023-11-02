import Logo from '../Logo/Logo';
import './Auth.css';

export default function Auth({ title, children }) {
  return (
    <div className='auth'>
      <Logo />
      <h1 className='auth__title'>{title}</h1>
      {children}
    </div>
  );
}
