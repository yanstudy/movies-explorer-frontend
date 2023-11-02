import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to='/'>
      <img src={logo} alt='logo' className='logo' />
    </Link>
  );
}
