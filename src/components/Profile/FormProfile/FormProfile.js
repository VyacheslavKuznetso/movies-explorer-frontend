import './FormProfile.css';
import React from 'react';
import { AppContext } from '../../../contexts/CurrentUserContext';

function FormProfile(props) {

  const currentUser = React.useContext(AppContext);

  return (
    <>
      <form className='profile__form' noValidate onSubmit={props.handleSubmit}>
        <div className='profile__field'>
          <label className='profile__info'>Имя</label>
          <input required
            className='profile__input'
            type="text"
            placeholder={currentUser.name}
            onChange={props.handleNameChange}
            name="name"
            minLength="2"
            maxLength="30" />
          <p className='form__input_error'>{props.nameError}</p>
        </div>
        <div className='profile__field'>
          <label className='profile__info'>E-mail</label>
          <input required
            className='profile__input'
            type="text"
            placeholder={currentUser.email}
            onChange={props.handleEmailChange}
            name="email"
            pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
          <p className='form__input_error'>{props.emailError}</p>
        </div>
        <div className='button-submit__container'>
          <p className='button-submit__error'>{props.message}</p>
          <button className={`button-submit effect ${props.formNotValid || props.message ? 'button-submit_disabled' : ''}`} type='submit' disabled={props.formNotValid}>Сохранить</button>
        </div>
      </form>
      <div className='form__exit effect' onClick={props.formExit}>Отменить редактирования профиля</div>
    </>
  )
}

export default FormProfile;