import './MoviesCard.css';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SavedMyMoviesContext } from '../../../contexts/CurrentUserContext'


function MoviesCard({ movie, handleMovieLike, handleMovieDelete }) {
  const savedMovies = React.useContext(SavedMyMoviesContext);
  const { pathname } = useLocation();

  const isLiked = savedMovies && savedMovies.some((saveMovie) => saveMovie.movieId === movie.id);


  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__movie ${isLiked ? 'element__movie_save' : 'element__movie_like'}`
  );

  function handleMovie() {
    if (isLiked === true) {
      const savedMovieId = savedMovies.find(
        (item) => item.movieId === movie.id
      );
      handleMovieDelete(savedMovieId);
    } else {
      handleMovieLike(movie)
    }
  }

  function handleDelete() { handleMovieDelete(movie) }



  return (
    <div className='element'>
      <div className='element__card'>
        <Link to={movie.trailerLink} className='element__card-link'
          target='blank'
          rel="noreferrer">
          <img className='element__card-img' src={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image} alt={movie.nameRU} />
        </Link>
        {pathname !== '/saved-movies' ? (
          <button className={cardLikeButtonClassName} type='button' onClick={handleMovie}>{isLiked ? '' : 'Сохранить'}</button>
        ) : (
          <button className='element__movie element__movie_delete' type='button' onClick={handleDelete}></button>
        )}
      </div>
      <div className='element__card-signature'>
        <h2 className='element__card-text'>{movie.nameRU}</h2>
        <p className='element__card-time'>{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      </div>
    </div >
  )

}

export default MoviesCard;