import './ButtonAutchLogg.css';
import React from 'react';
import { NavLink } from 'react-router-dom';


function ButtonAutchLogg() {


  return (
    <div className='navigation-button'>
      <NavLink to='/signup' className='navigation-button__register effect' type="button">Регистрация</NavLink>
      <NavLink to='/signin' className='navigation-button__entrance effect' type="button">Войти</NavLink>
    </div>
  )
}

export default ButtonAutchLogg;