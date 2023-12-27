import './Navigation.css';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuContext, activeLinkContext } from '../../../contexts/CurrentUserContext';

function Navigation(props) {

  const menu = React.useContext(MenuContext);
  const activeLink = React.useContext(activeLinkContext);


  return (
    <>
      <div className="navigation">
        <div className='navigation__movies'>
          <div className='conteiner__movies'>
            <NavLink to='/movies' className={`navigation__movies-button ${activeLink === 1 ? 'active' : ''} effect`} type="button" onClick={()=> props.handleLinkClick(1)}>Фильмы</NavLink>
            <NavLink to='/saved-movies' className={`navigation__movies-button ${activeLink === 2 ? 'active' : ''} effect`} type="button" onClick={()=> props.handleLinkClick(2)}>Сохранённые фильмы</NavLink>
          </div>
        </div>
        <NavLink to='/profile' className={`navigation-button__account ${activeLink === 3 ? 'active' : ''} effect`} type="button" onClick={()=> props.handleLinkClick(3)}>Аккаунт</NavLink>
      </div>
      <div className={`navigation__movies-burger ${menu ? 'navigation__movies-burger_position navigation__movies-burger_position-active' : ''}`} onClick={props.toggleBurger} >
        <span></span>
      </div>
    </>
  )
}

export default Navigation;
