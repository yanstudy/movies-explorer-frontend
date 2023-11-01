import { useState } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <label className={`checkbox ${isChecked ? 'checked' : ''}`}>
      <input
        className='checkbox__input'
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      Короткометражки
    </label>
  );
}
