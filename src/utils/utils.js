import { DURATION_SHORTS } from './constant'

// функция фильтрации фильмов по имени
export const filterByName = (movies, movieName) => {
  return movies.filter(movie => {
    const normalizedMovieName = movieName.toLowerCase();

    return (
      (movie.nameEN && movie.nameEN.toLowerCase().includes(normalizedMovieName)) ||
      (movie.nameRU && movie.nameRU.toLowerCase().includes(normalizedMovieName))
    );
  });
}


// функция фильтрации короткометражек
export const filterByDuration = movies => {
  return movies.filter(movie => movie.duration <= DURATION_SHORTS);
}