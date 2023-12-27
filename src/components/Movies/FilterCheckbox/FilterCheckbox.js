import './FilterCheckbox.css';

function FilterCheckbox() {

  return (
    <label className="movies__label">
      <input className="movies__checkbox" type='checkbox' />
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;