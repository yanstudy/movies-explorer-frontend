import { Link } from 'react-router-dom';
import './AuthButton.css';

export default function AuthButton({
  title,
  question,
  link,
  span,
  isValid,
  isLoading,
}) {
  return (
    <>
      <button
        type='submit'
        className={`auth-button ${
          !(isValid && !isLoading) ? 'auth-button_inactive' : ''
        }`}
        disabled={!(isValid && !isLoading)}
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
