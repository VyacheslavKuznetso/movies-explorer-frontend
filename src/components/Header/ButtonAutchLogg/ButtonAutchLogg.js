import './ButtonAutchLogg.css';
import React from 'react';
import { NavLink } from 'react-router-dom';


function ButtonAutchLogg() {


  return (
    <nav className='navigation-button'>
      <NavLink to='/signup' className='navigation-button__register effect' type="button">Регистрация</NavLink>
      <NavLink to='/signin' className='navigation-button__entrance effect' type="button">Войти</NavLink>
    </nav>
  )
}

export default ButtonAutchLogg;