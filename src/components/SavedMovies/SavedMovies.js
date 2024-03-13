import './SavedMovies.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import SearchForm from '../Movies/SearchForm/SearchForm';
import { SavedMyMoviesContext } from '../../contexts/CurrentUserContext';
import { filterByName, filterByDuration } from '../../utils/utils';


function SavedMovies({ handleMovieDelete }) {

  const [movies, setMovies] = useState([]);
  const savedMovies = React.useContext(SavedMyMoviesContext);
  const [error, setError] = React.useState();
  const [movieName, setMovieName] = React.useState('');
  const [filterMyMovies, setfilterMyMovies] = React.useState([]);
  const location = useLocation();
  const currentUrl = location.pathname;
  const [isShortMyFilm, setIsShortMyFilm] = React.useState(false);
  const [message, setMessage] = React.useState('У вас пока нет сохраненных фильмов 🎞');

  // сохраняем состояние чекбокса в localStorage
  const onFilterChange = (isChecked) => {
    localStorage.setItem('isShortMyFilm', !isChecked)
    setIsShortMyFilm(!isChecked)
  }

  useEffect(() => {
    let filteredSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    let filteredMyMovies = JSON.parse(localStorage.getItem('filterMyMovies'));

    // Применяем фильтр короткометражек, если чекбокс отмечен
    if (isShortMyFilm) {
      if (filteredMyMovies !== null) {
        let shortFilm = filterByDuration(filteredMyMovies.movies);
        setfilterMyMovies(shortFilm)
      } else {
        const shortFilm = filterByDuration(filteredSavedMovies);
        setMovies(shortFilm)
      }
    } else if (!isShortMyFilm) {
      if (filteredMyMovies !== null) {
        setfilterMyMovies(filteredMyMovies.movies);
      } else {
        setMovies(filteredSavedMovies)
      }
    }

  }, [isShortMyFilm]);



  // установка начальных значений из localStorage для страницы с поиском фильмов
  useEffect(() => {
    if (currentUrl === '/saved-movies') {
      if (localStorage.isShortMyFilm === 'true') setIsShortMyFilm(true);
      if (localStorage.isShortMyFilm === 'false') setIsShortMyFilm(false);
    }
  }, [currentUrl]);


  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
        setMovies(savedMovies)
      }, 4500);
    }
  }, [error])

  useEffect(() => {
    if (currentUrl === '/saved-movies') {
      if (!localStorage.filterMyMovies) {
        localStorage.setItem('isShortMyFilm', JSON.stringify(false));
      }
      setMovies(savedMovies);
    }
  }, [savedMovies])


  useEffect(() => {
    const storedSearchResults = JSON.parse(localStorage.getItem('filterMyMovies'));

    if (storedSearchResults) {
      setMovieName(storedSearchResults.movieName);
      setfilterMyMovies(storedSearchResults.movies);
    }
  }, []);



  function ClearField() {
    if (localStorage.filterMyMovies) {
      setTimeout(() => {
        localStorage.removeItem('filterMyMovies');
        setfilterMyMovies('');
        setMovieName('');

      }, 300)
    } else {
      setMovieName('')
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();

    let filteredMovies;
    // Применяем фильтр короткометражек, если чекбокс отмечен
    if (isShortMyFilm) {
      let shortFilm = filterByDuration(movies);
      filteredMovies = shortFilm;
    } else {
      filteredMovies = movies;
    }

    filterMoviesByName(filteredMovies, movieName);
  }


  function filterMoviesByName(movies, movieName) {
    let filterMovies = filterByName(movies, movieName);

    if (filterMovies.length === 0) {
      setError('Список пуст');
      setMovies([])
    }

    setfilterMyMovies(filterMovies);

    localStorage.setItem('filterMyMovies', JSON.stringify({
      movieName,
      movies: filterMovies,
    }));
  }

  return (
    <main className="saved">
      <div className='saved-conteiner'>
        <SearchForm movieName={movieName} setMovieName={setMovieName} handleSubmit={handleSearchMovies} ClearField={ClearField} onFilterChange={onFilterChange} />
        <p className={`isNot-saved-movies ${error ? 'isNot-saved-movies_error' : ''}`}>{error}</p>
        <p className={`saved__message ${savedMovies.length !== 0 ? '' : 'saved__message_vizible'}`}>{message}</p>
      </div>
      <div className="saved-card__list">
        <MoviesCardList filteredData={filterMyMovies.length !== 0 ? filterMyMovies : movies} handleMovieDelete={handleMovieDelete} />
      </div>
    </main>
  )
}

export default SavedMovies;