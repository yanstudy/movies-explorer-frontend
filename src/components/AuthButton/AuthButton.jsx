import { Link } from 'react-router-dom';
import './AuthButton.css';

export default function AuthButton({ title, question, link, span, isActive }) {
  return (
    <>
      <button
        type='submit'
        className={`auth-button ${!isActive ? 'auth-button_inactive' : ''}`}
        disabled={isActive}
      >
        {title}
      </button>
      <h4 className='auth-button__question'>
        {question}
        <Link to={link} className='auth-button__link'>
          <span> {span} </span>
        </Link>
      </h4>
    </>
  );
}
