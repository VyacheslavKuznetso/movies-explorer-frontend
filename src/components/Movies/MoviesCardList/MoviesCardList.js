import './MoviesCardList.css';
import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList(props) {

  const [renderMovies, setRenderMovies] = useState([]);


  useEffect(() => {
    if (props.filteredData) {
      // Устанавливаем renderMovies при изменении props.data
      setRenderMovies(props.filteredData);
    }
  }, [props.filteredData]);



  return (
    <ul className='elements'>
      {renderMovies.map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}
          handleMovieLike={props.handleMovieLike}
          handleMovieDelete={props.handleMovieDelete}
        />
      ))}
    </ul>
  )

}

export default MoviesCardList;