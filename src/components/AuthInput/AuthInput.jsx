import './AuthInput.css';

export default function AuthInput({ label, type, id }) {
  return (
    <div className='auth-input'>
      <label htmlFor={id} className='auth-input__label'>
        {label}
      </label>
      <input type={type} className='auth-input__input' id={id} />
    </div>
  );
}
