import React from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import getBeatFilmMovies from '../../utils/getBeatFilmMovies';

function Movies(props) {

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);



  async function onGetMovie() {
    setLoading(true);

    try {
      const data = await getBeatFilmMovies();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <main className='movies'>
      <div className='movies-conteiner'>
        <SearchForm  onGetMovie={onGetMovie} />
      </div>
      <div className="movies-card__list">
      {loading ? <Preloader /> : <MoviesCardList data={data} />}
      </div>
    </main>
  )
}

export default Movies;