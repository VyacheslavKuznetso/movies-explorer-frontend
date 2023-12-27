import React from 'react';
import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppContext, MenuContext, LoggedInContext, activeLinkContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupMenu from '../PopupMenu/PopupMenu';
import Movies from '../Movies/Movies';
import ProtectedRoute from '../ProtectedRoute';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const body = document.body;

  const [isPopupMenuOpen, setPopupMenuOpen] = useState(false);


  const [currentUser, setCurrentUser] = useState({
    name: 'Вячеслав',
    email: 'pochta@yandex.ru'
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);


  const toggleBurger = () => {
    setPopupMenuOpen(!isPopupMenuOpen);
    if (isPopupMenuOpen) {
      body.classList.remove('overflow');
    } else {
      body.classList.add('overflow');
    }
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


  return (
    <>
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
                  <Route path='/movies' element={
                    <ProtectedRoute>
                      <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                      <Movies />
                      <Footer />
                    </ProtectedRoute>
                  } />
                  <Route path='/saved-movies' element={
                    <ProtectedRoute>
                      <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                      <Movies />
                      <Footer />
                    </ProtectedRoute>
                  } />
                  <Route path='/profile' element={
                    <ProtectedRoute>
                      <Header toggleBurger={toggleBurger} handleLinkClick={handleLinkClick} />
                      <Profile setLoggedIn={setLoggedIn} />
                    </ProtectedRoute>
                  } />
                  <Route path='/signup' element={
                    <Register handleLinkClick={handleLinkClick} />
                  } />
                  <Route path='/signin' element={
                    <Login handleLinkClick={handleLinkClick} />
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
    </>
  )
}

export default App;
