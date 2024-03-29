import './Navigation.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext, activeLinkContext } from '../../../contexts/CurrentUserContext';

function Navigation(props) {

  const menu = React.useContext(MenuContext);
  const activeLink = React.useContext(activeLinkContext);


  return (
    <>
      <div className="navigation">
        <nav className='navigation__movies'>
          <nav className='conteiner__movies'>
            <NavLink to='/movies' className={`navigation__movies-button ${activeLink === 1 ? 'active' : ''} effect`} onClick={()=> props.handleLinkClick(1)}>Фильмы</NavLink>
            <NavLink to='/saved-movies' className={`navigation__movies-button ${activeLink === 2 ? 'active' : ''} effect`} onClick={()=> props.handleLinkClick(2)}>Сохранённые фильмы</NavLink>
          </nav>
          <NavLink to='/profile' className={`navigation-button__account ${activeLink === 3 ? 'active' : ''} effect`} onClick={()=> props.handleLinkClick(3)}>Аккаунт</NavLink>
        </nav>
      </div>
      <div className={`navigation__movies-burger ${menu ? 'navigation__movies-burger_position navigation__movies-burger_position-active' : ''}`} onClick={props.toggleBurger} >
        <span></span>
      </div>
    </>
  )
}

export default Navigation;
