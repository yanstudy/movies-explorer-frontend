import './FilterCheckbox.css';

export default function FilterCheckbox({ isChecked, onCheckboxChange }) {
  const handleCheckboxChange = () => {
    onCheckboxChange();
  };

  return (
    <label className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className='checkbox__track'>
        <span className='checkbox__indicator'></span>
      </span>
      Короткометражки
    </label>
  );
}
