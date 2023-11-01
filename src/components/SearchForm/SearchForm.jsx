import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <form className='searchform' noValidate>
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
