import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className='searchform' onSubmit={handleSearchSubmit}>
      <div className='searchform__container'>
        <input
          className='searchform__input'
          type='text'
          name='movieInput'
          placeholder='Фильм'
          required
        ></input>
        <button className='searchform__button' type='submit'></button>
      </div>
      <FilterCheckbox />
    </form>
  );
}
