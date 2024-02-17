import './FilterCheckbox.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ onFilterChange }) {
  const [isChecked, setIsChecked] = useState(false);
  const { pathname } = useLocation();


  useEffect(() => {
    if (pathname === '/movies') {
      if (localStorage.isShortFilm === 'true') setIsChecked(true);
      if (localStorage.isShortFilm === 'false') setIsChecked(false);
    } else {
      if (localStorage.isShortMyFilm === 'true') setIsChecked(true);
      if (localStorage.isShortMyFilm === 'false') setIsChecked(false);
    }
  }, [pathname]);

  const onChecked = () => {
    setIsChecked(!isChecked)

    onFilterChange(isChecked)
  }

  return (
    <label className="movies__label">
      <input
        className="movies__checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={() => { }}
        onClick={onChecked}
      />
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
