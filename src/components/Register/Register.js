import './Register.css';
import HeaderLog from '../../images/logo.svg';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';

function Register(props) {

  const history = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <header className='header__register'>
        <NavLink to='/'>
          <img className="logo logo_place_header" src={HeaderLog} alt="Логотип" onClick={() => props.handleLinkClick(0)} />
        </NavLink>
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>
      <Form nameFor='register__form' nameId="registerForm" formId="registerForm" submitButtonLabel="Зарегистрироваться" >
        <label className="form__wrapper">
          <input className="form__input form__input_text_name" onChange={(e) => setName(e.target.value)} type="text" name="name" />
          <div className={`input__label ${name === '' ? '' : 'position'}`}>Имя</div>
          <p className='form__input_error'></p>
        </label>
        <label className="form__wrapper">
          <input className="form__input form__input_text_email" onChange={(e) => setEmail(e.target.value)} type="text" name="email" />
          <div className={`input__label ${email === '' ? '' : 'position'}`}>E-mail</div>
          <p className='form__input_error'></p>
        </label>
        <label className="form__wrapper">
          <input className="form__input form__input_text_password" onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
          <div className={`input__label ${password === '' ? '' : 'position'}`}>Password</div>
          <p className='form__input_error'></p>
        </label>
      </Form>
      <div className="informationSupport">
        <p className="informationSupport__text informationSupport__text-question">Уже зарегистрированы?</p>
        <NavLink to='/signin' className="informationSupport__text informationSupport__text-login effect">Войти</NavLink>
      </div>
    </>
  )

}

export default Register;