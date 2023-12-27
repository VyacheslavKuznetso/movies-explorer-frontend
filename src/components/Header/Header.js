import React from 'react';
import './Header.css';
import HeaderLog from '../../images/logo.svg';
import Navigation from './Navigation/Navigation';
import ButtonAutchLogg from './ButtonAutchLogg/ButtonAutchLogg';
import { NavLink } from 'react-router-dom';
import {LoggedInContext} from '../../contexts/CurrentUserContext'

function Header(props) {

  const loggedIn = React.useContext(LoggedInContext);


  return (
    <div className="header">
      <section className='header__user'>
        <NavLink to='/'>
          <img className="logo logo_place_header" src={HeaderLog} alt="Логотип" onClick={()=> props.handleLinkClick(0)} />
        </NavLink>
        <div className='header__user-movies'>
          {loggedIn
            ? <Navigation toggleBurger={props.toggleBurger} handleLinkClick={props.handleLinkClick} />
            : <ButtonAutchLogg />
          }
        </div>
      </section>
    </div>
  )
}

export default Header;
