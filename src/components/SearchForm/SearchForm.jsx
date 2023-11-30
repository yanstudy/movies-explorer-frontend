import { useEffect, useRef, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import AuthError from '../AuthError/AuthError';

export default function SearchForm({
  onGetResult,
  onCheckboxChange,
  isChecked,
  saved,
  isLoadingMovies,
}) {
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value === '') {
      setError('Нужно ввести ключевое слово');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else onGetResult(inputRef.current.value);
  };

  useEffect(() => {
    const key = localStorage.getItem('keyword');
    if (key && !saved) {
      inputRef.current.value = key;
    }
  }, [saved]);

  return (
    <form className='searchform' onSubmit={handleSearchSubmit} noValidate>
      <div className='searchform__container'>
        <input
          className='searchform__input'
          type='text'
          name='movieInput'
          placeholder='Фильм'
          required
          ref={inputRef}
        ></input>
        <button
          className={`searchform__button ${
            isLoadingMovies ? 'searchform__button_inactive' : ''
          }`}
          type='submit'
          disabled={isLoadingMovies}
        ></button>
        {error && <AuthError error={error} />}
      </div>
      <FilterCheckbox
        onCheckboxChange={onCheckboxChange}
        isChecked={isChecked}
      />
    </form>
  );
}
