import './PopupMenu.css';
import React, { useEffect, useState } from 'react';
import { MenuContext, activeLinkContext } from '../../contexts/CurrentUserContext';
import { NavLink, useNavigate } from 'react-router-dom';


function PopupMenu({ handleLinkClick }) {

  const menu = React.useContext(MenuContext);
  const activeLink = React.useContext(activeLinkContext);


  return (
    <div className={`popup ${menu ? 'popup_opened' : ''}`}>
      <div className='conteiner__menu'>
        <ul className='navigation__links'>
          <NavLink to='/' className={`navigation__link ${activeLink === 0 ? 'decoration' : ''} effect`} onClick={() => handleLinkClick(0)}>Главная</NavLink>
          <NavLink to='/movies' className={`navigation__link ${activeLink === 1 ? 'decoration' : ''} effect`} onClick={() => handleLinkClick(1)}>Фильмы</NavLink>
          <NavLink to='/saved-movies' className={`navigation__link ${activeLink === 2 ? 'decoration' : ''} effect`} onClick={() => handleLinkClick(2)}>Сохранённые фильмы</NavLink>
        </ul>
        <div className='conteiner__account'>
          <NavLink to='/profile' className={`navigation__account ${activeLink === 3 ? 'navigation_active' : ''} effect`} onClick={() => handleLinkClick(3)}>Аккаунт</NavLink>
        </div>
      </div>
    </div>
  )
}

export default PopupMenu;
