import React from 'react';
import './App.css';
import { Routes, Route, useNavigate, Navigate, useLocation, Redirect, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppContext, MenuContext, LoggedInContext, activeLinkContext, SavedMyMoviesContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupMenu from '../PopupMenu/PopupMenu';
import ProtectedRoute from '../ProtectedRoute';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/auth';
import api from '../../utils/MainApi';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'


function App() {

  const [isPopupMenuOpen, setPopupMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // стейт массива сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const navigate = useNavigate();
  const [isShortFilm, setIsShortFilm] = useState(false);

  // стейт фильмов, найденных в сохраненных
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  // стейт поиска на странице сохраненных фильмов
  const [isSearchStarted, setIsSearchStarted] = useState(false);


  const toggleBurger = () => {
    setPopupMenuOpen(!isPopupMenuOpen);
  }

  const getInitialActiveLink = () => {
    setCurrentPath(window.location.pathname)
    // Определить, какой пункт активен в зависимости от текущего пути
    if (currentPath === '/movies') {
      return 1;
    } else if (currentPath === '/saved-movies') {
      return 2;
    } else if (currentPath === '/profile') {
      return 3;
    } else {
      return 0;
    }
  };

  const [activeLink, setActiveLink] = useState(getInitialActiveLink);

  const handleLinkClick = (index) => {
    setActiveLink(index);
    // Сохраняем значение в localStorage при каждом клике на ссылку
    localStorage.setItem('activeLink', index);
    setPopupMenuOpen(false);
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getFavoredMoves()])
        .then(([userInfo, movesInfo]) => {
          setCurrentUser(userInfo.data);
          localStorage.setItem('savedMovies', JSON.stringify(movesInfo.movies));
          setSavedMovies(movesInfo.movies);
        })
        .catch(console.error);
    }
  }, [loggedIn, navigate])

  useEffect(() => {
    loggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);


  function handleMovieLike(movie) {
    api.addFavoredMoves(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(console.error);
  };

  function handleMovieDelete(movie) {
    api.removeFavoredMoves(movie._id)
      .then(() => {
        setSavedMovies((savedMovies) => {
          // Фильтруем массив cards, исключая удаленную карточку
          const updatedMovies = savedMovies.filter((m) => m.movieId !== movie.movieId);
          return updatedMovies;
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    setCurrentPath(window.location.pathname);
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate({ currentPath })
          }
        })
        .catch(console.error);
    } else {
      setLoggedIn(false)
      navigate('/', { replace: true })
    }
  }



  return (
    <>
      <SavedMyMoviesContext.Provider value={savedMovies}>
        <activeLinkContext.Provider value={activeLink}>
          <MenuContext.Provider value={isPopupMenuOpen}>
            <AppContext.Provider value={currentUser}>
              <LoggedInContext.Provider value={loggedIn}>
                <div className='page'>
                  <Routes>
                    <Route path='/' element={
                      <>
                        <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                        <Main />
                        <Footer />
                      </>
                    } />
                    <Route path='/profile' element={
                      <ProtectedRoute>
                        <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                        <Profile setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
                      </ProtectedRoute>
                    } />
                    <Route path='/signup' element={
                      <Register handleLinkClick={handleLinkClick} setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
                    } />
                    <Route path='/signin' element={
                      <Login handleLinkClick={handleLinkClick} setLoggedIn={setLoggedIn} />
                    } />
                    <Route path='/saved-movies' element={
                      <ProtectedRoute>
                        <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                        <SavedMovies
                          handleMovieDelete={handleMovieDelete}
                        />
                        <Footer />
                      </ProtectedRoute>
                    } />
                    <Route path='/movies' element={
                      <ProtectedRoute>
                        <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                        <Movies
                          handleMovieLike={handleMovieLike}
                          handleMovieDelete={handleMovieDelete}
                          handleLinkClick={handleLinkClick}
                        />
                        <Footer />
                      </ProtectedRoute>
                    } />
                    <Route path='*' element={
                      <PageNotFound />
                    } />
                  </Routes>
                  <PopupMenu handleLinkClick={handleLinkClick} />
                </div>
              </LoggedInContext.Provider>
            </AppContext.Provider>
          </MenuContext.Provider>
        </activeLinkContext.Provider>
      </SavedMyMoviesContext.Provider>
    </>
  )
}

export default App;
