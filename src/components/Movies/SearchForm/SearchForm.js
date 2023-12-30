import './SearchForm.css';
import React from "react";
import MoviesButton from '../../../images/find-3.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const movieRef = React.useRef();
  const [movieName, setMovieName] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const movie = movieRef.current.value;

    props.onGetMovie({
      movie: movie
    });

  }

  return (
    <>
      <form className="movies-form" onSubmit={handleSubmit} noValidate>
        <div className="conteiner-form">
        <input className="movies-form__input"
        ref={movieRef}
        type='text'
        placeholder='Фильм'
        name='movie'
        minLength="6"
        autoComplete='off'
            />
        <button className="movies-form__button" type='submit' onClick={props.onGetMovie}>
          <img src={MoviesButton} alt="Кнопка поиска" />
        </button>
      </div>
      <FilterCheckbox />
    </form >
    </>
  )
}

export default SearchForm;