import './SearchForm.css';
import React from "react";
import { useLocation } from 'react-router-dom';
import MoviesButton from '../../../images/find-3.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ movieName, setMovieName, onFilterChange, handleSubmit, ClearField }) {
  // const movieRef = React.useRef();
  const [movieError, setMovieError] = React.useState('')
  const [formNotValid, setformNotValid] = React.useState(true);
  const { pathname } = useLocation();


  React.useEffect(() => {
    if (movieError || !movieName) {
      setformNotValid(true);
    } else {
      setformNotValid(false);
    }
  }, [movieError, movieName]);

  function handleMovie(e) {
    setMovieName(e.target.value);
    setMovieError(e.target.validationMessage);
  }


  return (
    <>
      <form className="movies-form" onSubmit={handleSubmit}
      noValidate>
        <div className="conteiner-form">
        <input required
        className="movies-form__input"
        type='text'
        value={movieName || ''}
        placeholder='Фильм'
        name='movie'
        autoComplete='off'
        onChange={handleMovie} />
        {pathname === '/saved-movies' ?
        <button className={`movies-form__button-input ${movieName !== '' ? 'movies-form__button-input_clear-field' : ''}`} type='button' onClick={ClearField}></button>
        :
        ''
        }
        <button className="movies-form__button effect" type='submit' disabled={formNotValid} >
          <img src={MoviesButton} alt="Кнопка поиска" className='effect'/>
        </button>
        <p className='movies-form_error'>{movieError}</p>
      </div>
      <FilterCheckbox onFilterChange={onFilterChange}/>
    </form >
    </>
  )
}

export default SearchForm;