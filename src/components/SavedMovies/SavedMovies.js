import './SavedMovies.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import SearchForm from '../Movies/SearchForm/SearchForm';
import { SavedMyMoviesContext } from '../../contexts/CurrentUserContext';
import { filterByName } from '../../utils/utils';

function SavedMovies({ handleMovieDelete }) {
  const { pathname } = useLocation();

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')))
  const savedMovies = React.useContext(SavedMyMoviesContext);
  const [error, setError] = React.useState();
  const [movieName, setMovieName] = React.useState('');
  const [filterMyMovies, setfilterMyMovies] = React.useState([]);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 4500);
    }
  }, [error])

  useEffect(() => {
    if (pathname === '/saved-movies') {
      setMovies(savedMovies)
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
        setMovieName('')

      }, 300)
    } else {
      setMovieName('')
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();

    filterMoviesByName(movies, movieName);

  }

  function filterMoviesByName(movies, movieName) {
    let filterMovies = filterByName(movies, movieName);

    if (filterMovies.length === 0) {
      setError('По вашему запросу не найдено');
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
        <SearchForm movieName={movieName} setMovieName={setMovieName} handleSubmit={handleSearchMovies} ClearField={ClearField} />
        <p className={`isNot-movies ${error ? 'isNot-movies_error' : ''}`}>{error}</p>
      </div>
      <div className="saved-card__list">
        <MoviesCardList filteredData={filterMyMovies.length !== 0 ? filterMyMovies : movies} handleMovieDelete={handleMovieDelete} />
      </div>
    </main>
  )
}

export default SavedMovies;