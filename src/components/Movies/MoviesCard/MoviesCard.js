import './MoviesCard.css';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {

  



  return (
    <div className='element'>
      <div className='element__card'>
      <Link to={movie.trailerLink} className='element__card-link'
        target='blank'
        rel="noreferrer">
        <img className='element__card-img' src={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image} alt={movie.nameRU} />
        </Link>
        <button className='element__card-save'>Сохранить</button>
      </div>
      <div className='element__card-signature'>
        <h2 className='element__card-text'>{movie.nameRU}</h2>
        <p className='element__card-time'>{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      </div>
    </div>
  )

}

export default MoviesCard;