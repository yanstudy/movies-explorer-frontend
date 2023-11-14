import './AuthError.css';

export default function AuthError({ error }) {
  return <span className='auth-error'>{error}</span>;
}
