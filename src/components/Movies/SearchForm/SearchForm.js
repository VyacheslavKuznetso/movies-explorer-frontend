import './SearchForm.css';
import React from "react";
import MoviesButton from '../../../images/find-3.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  // const movieRef = React.useRef();
  const [movieName, setMovieName] = React.useState('');
  const [movieError, setMovieError] = React.useState('')
  const [formNotValid, setformNotValid] = React.useState(true);

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

  function handleSubmit(e) {
    e.preventDefault();


  }

  return (
    <>
      <form className="movies-form" onSubmit={handleSubmit} noValidate>
        <div className="conteiner-form">
        <input required
        className="movies-form__input"
        type='text'
        placeholder='Фильм'
        name='movie'
        minLength="6"
        autoComplete='off'
        onChange={handleMovie} />
        <button className="movies-form__button effect" type='submit' onClick={props.onGetMovie} disabled={formNotValid} >
          <img src={MoviesButton} alt="Кнопка поиска" className='effect'/>
        </button>
        <p className='movies-form_error'>{movieError}</p>
      </div>
      <FilterCheckbox />
    </form >
    </>
  )
}

export default SearchForm;