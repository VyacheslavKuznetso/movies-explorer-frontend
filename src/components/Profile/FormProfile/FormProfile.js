import './FormProfile.css';
import React from 'react';

function FormProfile(props) {


  return (
    <>
      <form className='profile__form' >
        <div className='profile__field'>
          <label className='profile__info'>Имя</label>
          <input required
            className='profile__input'
            type="text"
            value={props.name}
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
            value={props.email || ''}
            onChange={props.handleEmailChange}
            name="email"
            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,}" />
          <p className='form__input_error'>{props.emailError}</p>
        </div>
        <conteiner className='button-submit__conteiner'>
          <p className='button-submit__error'>{props.message}</p>
          <button className={`button-submit effect ${props.formNotValid || props.message ? 'button-submit_disabled' : ''}`} type='submit' disabled={props.formNotValid}>Сохранить</button>
        </conteiner>
      </form>
      <div className='form__exit effect' onClick={props.formExit}>Отменить редактирования профиля</div>
    </>
  )
}

export default FormProfile;