import './ButtonMore.css';
import React from 'react';
import { useLocation } from 'react-router-dom'

function ButtonMore({ handleMoreClick }) {
  const { pathname } = useLocation();

  return (
    <div className={pathname !== '/saved-movies' ? 'list__pagination' : 'list__pagination_disable'}>
      <button
        className='list__more  animation'
        type='button'
        onClick={handleMoreClick}
      >Ещё</button>
    </div>
  )
}

export default ButtonMore;