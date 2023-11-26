import './AuthInput.css';

export default function AuthInput({
  label,
  type,
  id,
  name,
  value,
  onChange,
  error,
  minLength,
  maxLength,
  pattern,
}) {
  return (
    <div className='auth-input'>
      <label htmlFor={id} className='auth-input__label'>
        {label}
      </label>
      <input
        type={type}
        className='auth-input__input'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required
      />
      <span className='auth-input_error'>{error}</span>
    </div>
  );
}
