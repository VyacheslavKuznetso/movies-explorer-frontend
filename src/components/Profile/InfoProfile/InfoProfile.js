import './InfoProfile.css';
import React from 'react';
import { AppContext } from '../../../contexts/CurrentUserContext';

function InfoProfile(props) {

  const currentUser = React.useContext(AppContext);

  return (
    <>
      <div className='profile__container-info' >
        <div className='profile__user'>
          <h2 className='profile__user-info'>Имя</h2>
          <p required className='profile__current-user'>{currentUser.name}</p>
        </div>
        <div className='profile__user'>
          <h2 className='profile__user-info'>E-mail</h2>
          <p required className='profile__current-user'>{currentUser.email}</p>
        </div>
      </div>
      <button className='profile__edit  effect profile__edit_error' type="button" onClick={props.editProfile}>Редактировать</button>
      <div className='profile__logout  effect' onClick={props.signOut}>Выйти из аккаунта</div>
    </>
  )
}

export default InfoProfile;