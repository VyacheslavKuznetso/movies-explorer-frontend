import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import getBeatFilmMovies from '../../utils/getBeatFilmMovies';
import { LoggedInContext } from '../../contexts/CurrentUserContext';
import { filterByDuration, filterByName } from '../../utils/utils';
import ButtonMore from './ButtonMore/ButtonMore';
import {
  DESKTOP_SETTINGS,
  TABLET_SETTINGS,
  MOBILE_SETTINGS
} from '../../utils/constant';

function Movies({ handleMovieLike, handleMovieDelete }) {
  const loggedIn = React.useContext(LoggedInContext);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [movieName, setMovieName] = React.useState('');

  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;
  const [movies, setMovies] = React.useState([]);


  const [renderMovies, setRenderMovies] = React.useState([]);
  const [quantity, setQuantity] = React.useState(DESKTOP_SETTINGS.defaultMovies);
  const [showMoreFilms, setShowMoreFilms] = React.useState(DESKTOP_SETTINGS.moreStep);

  // сохраняем состояние чекбокса в localStorage
  const onFilterChange = (isChecked) => {
    localStorage.setItem('isShortFilm', !isChecked)
    setIsShortFilm(!isChecked)
    filterByCheckboxStatus(!isChecked)
  }

  function filterByCheckboxStatus (isChecked) {
    setError('')
    setLoading(true);

    setTimeout(() => {
      filterMoviesByName(data, movieName, isChecked)

      setLoading(false);

    }, 4500)
  }

  useEffect(() => {
    if (currentUrl === '/movies') {
      const storedSearchResults = JSON.parse(localStorage.getItem('searchResults'));

      if (storedSearchResults) {
        setMovieName(storedSearchResults.movieName);
        setMovies(storedSearchResults.movies);
        setError(storedSearchResults.filterError)
      }

    }
  }, [currentUrl]);

  // установка начальных значений из localStorage для страницы с поиском фильмов
  useEffect(() => {
    if (currentUrl === '/movies') {
      if (localStorage.isShortFilm === 'true') setIsShortFilm(true);
      if (localStorage.isShortFilm === 'false') setIsShortFilm(false);
    }
  }, [currentUrl]);


  useEffect(() => {
    if (data.length === 0) {
      try {
        getBeatFilmMovies()
          .then(allData => {
            if (allData) {
              setData(allData);
            } else {
              setError('Ничего не найдено');
            }
          })
          .catch(error => {
            setError('Ошибка при получении данных');
          });
      } catch (error) {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      }
    }
  }, [loggedIn]);


  function handleSubmit(e) {
    e.preventDefault();

    setError('')
    setLoading(true);

    if (data.length === 0) return;

    setTimeout(() => {
      filterMoviesByName(data, movieName)

      setLoading(false);

    }, 4500)

  }

  function filterMoviesByName(movies, movieName, isChecked = isShortFilm) {

    if(movieName === '') return;

    let filterError 
    let foundMovies = filterByName(movies, movieName);

    if (foundMovies.length === 0) {
      setError('По вашему запросу ничего не найдено');
      filterError = 'По вашему запросу ничего не найдено';
    }

    let resMovies = filterFoundMovies(foundMovies, isChecked)

    if (resMovies.length === 0) {
      setError('По вашему запросу ничего не найдено');
      filterError = 'По вашему запросу ничего не найдено';
    }

    setMovies(resMovies)
    localStorage.setItem('searchResults', JSON.stringify({
      filterError,
      movieName,
      movies: resMovies,
    }));

    setLoading(false);
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



  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [movies]);

  useEffect(() => {
    // Обрабатываем количество отображаемых карточек
    if (currentUrl === '/movies') {
      setRenderMovies(movies.slice(0, quantity));
    } else {
      setRenderMovies(movies);
    }
  }, [movies, quantity]);

  function onResize() {
    const width = window.innerWidth;
    let settings;
    if (width > TABLET_SETTINGS.maxWidth) {
      settings = DESKTOP_SETTINGS;
    } else if (width > MOBILE_SETTINGS.maxWidth) {
      settings = TABLET_SETTINGS;
    } else {
      settings = MOBILE_SETTINGS;
    }

    setQuantity(settings.defaultMovies);
    setShowMoreFilms(settings.moreStep);
  }

  const handleMoreClick = () => {
    // Обработка нажатия на кнопку "Ещё"
    const newArray = [
      ...movies.slice(0, (quantity + showMoreFilms))
    ];
    setQuantity(quantity + showMoreFilms);
    setRenderMovies(newArray);
  }


  return (
    <main className='movies'>
      <div className='movies-container'>
        <SearchForm movieName={movieName} setMovieName={setMovieName} handleSubmit={handleSubmit} onFilterChange={onFilterChange} />
      </div>
      <div className="movies-card__list">
        {loading
          ?
          <Preloader />
          :
          <MoviesCardList filteredData={renderMovies} handleMovieLike={handleMovieLike} handleMovieDelete={handleMovieDelete} />}
        <p className={`isNot-movies ${error ? 'isNot-movies_error' : ''}`}>{error}</p>
        {renderMovies.length === movies.length ? ''
          : <ButtonMore handleMoreClick={handleMoreClick} />}
      </div>
    </main>
  )
}

export default Movies;