import './MoviesCardList.css';
import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';




function MoviesCardList(props) {

  const [renderMovies, setRenderMovies] = useState([]);


  useEffect(() => {
    if (props.data) {
      // Устанавливаем renderMovies при изменении props.data
      setRenderMovies(props.data);
    }
  }, [props.data]);


  return (
    <div className='elements'>
      {renderMovies.map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}
        />
      ))}
    </div>
  )

}

export default MoviesCardList;