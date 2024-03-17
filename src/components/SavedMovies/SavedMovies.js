import './SavedMovies.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import SearchForm from '../Movies/SearchForm/SearchForm';
import { SavedMyMoviesContext } from '../../contexts/CurrentUserContext';
import { filterByName, filterByDuration } from '../../utils/utils';


function SavedMovies({ handleMovieDelete }) {

  const savedMovies = React.useContext(SavedMyMoviesContext);
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [error, setError] = React.useState('');
  const [movieName, setMovieName] = React.useState('');
  const location = useLocation();
  const currentUrl = location.pathname;
  const [isShortMyFilm, setIsShortMyFilm] = React.useState(false);
  const [message, setMessage] = React.useState('');


  useEffect(() => {
    if (savedMovies.length === 0) {
      setTimeout(() => {
        setMessage('У вас пока нет сохраненных фильмов 🎞')
      }, 900)
    }
  }, [])

  useEffect(() => {
    if (currentUrl === '/saved-movies') {

      setMovies(savedMovies);
    }
  }, [savedMovies])

  // сохраняем состояние чекбокса в localStorage
  const onFilterChange = (isChecked) => {
    localStorage.setItem('isShortMyFilm', !isChecked)
    setIsShortMyFilm(!isChecked);

    filterByCheckboxStatus(!isChecked)
  }

  function filterByCheckboxStatus(isChecked) {
    if (savedMovies.length === 0) return;
    setError('')

    filterMoviesByName(savedMovies, movieName, isChecked)

  }

  // установка начальных значений из localStorage для страницы с поиском фильмов
  useEffect(() => {
    if (currentUrl === '/saved-movies') {
      if (localStorage.isShortMyFilm === 'true') setIsShortMyFilm(true);
      if (localStorage.isShortMyFilm === 'false') setIsShortMyFilm(false);
    }
  }, [currentUrl]);


  useEffect(() => {
    const storedSearchResults = JSON.parse(localStorage.getItem('filterMyMovies'));

    if (storedSearchResults) {
      setMovieName(storedSearchResults.movieName);
      setFilterMovies(storedSearchResults.movies);
      setError(storedSearchResults.filterError)
    }
  }, []);


  // сбросить запрос
  function ClearField() {
    if (localStorage.filterMyMovies) {
      setTimeout(() => {
        localStorage.removeItem('filterMyMovies');
        localStorage.setItem('isShortMyFilm', JSON.stringify(false));
        setMovieName('');
        setIsShortMyFilm(false);
        setError('')
        setFilterMovies([])
      }, 300)
    } else {
      setTimeout(() => {
        setMovieName('');
        localStorage.setItem('isShortMyFilm', JSON.stringify(false));
        setIsShortMyFilm(false);
        setError('')
        setFilterMovies([])

      }, 300)
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();

    setError('')

    filterMoviesByName(savedMovies, movieName)
  }

  function filterMoviesByName(movies, movieName, isChecked = isShortMyFilm) {

    if (savedMovies.length === 0) return;
    let filterError
    console.log(movieName);
    let foundMovies = filterByName(movies, movieName);

    console.log(foundMovies);

    if (foundMovies.length === 0) {
      setError('По вашему запросу ничего не найдено');
      filterError = 'По вашему запросу ничего не найдено'

    }

    let resMovies = filterFoundMovies(foundMovies, isChecked)

    if (resMovies.length === 0) {
      setError('По вашему запросу ничего не найдено');
      filterError = 'По вашему запросу ничего не найдено'

    }

    setFilterMovies(resMovies)
    console.log({ error });
    localStorage.setItem('filterMyMovies', JSON.stringify({
      filterError,
      movieName,
      movies: resMovies
    }));
  }


  function filterFoundMovies(foundMovies, isChecked) {

    let filteredMovies;
    console.log(isChecked);
    // Применяем фильтр короткометражек, если чекбокс отмечен
    if (isChecked) {
      let shortFilm = filterByDuration(foundMovies);
      filteredMovies = shortFilm;
    } else {
      filteredMovies = foundMovies;
    }

    return filteredMovies
  }

  return (
    <main className="saved">
      <div className='saved-conteiner'>
        <SearchForm movieName={movieName} setMovieName={setMovieName} handleSubmit={handleSearchMovies} ClearField={ClearField} onFilterChange={onFilterChange} />
        <p className={`isNot-saved-movies ${error ? 'isNot-saved-movies_error' : ''}`}>{error}</p>
        <p className={`saved__message ${savedMovies.length !== 0 ? '' : 'saved__message_vizible'}`}>{message}</p>
      </div>
      <div className="saved-card__list">
        <MoviesCardList filteredData={filterMovies.length !== 0 || error ? filterMovies : movies} handleMovieDelete={handleMovieDelete} />
      </div>
    </main>
  )
}

export default SavedMovies;