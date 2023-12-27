import './Login.css';
import HeaderLog from '../../images/logo.svg';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';

function Login(props) {
  const history = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <header className='header__login'>
        <NavLink to='/'>
          <img className="logo logo_place_header" src={HeaderLog} alt="Логотип" onClick={() => props.handleLinkClick(0)} />
        </NavLink>
        <h1 className='register__title'>Рады видеть!!</h1>
      </header>
      <Form nameFor='login__form' nameId="loginForm" formId="loginForm" submitButtonLabel="Войти" >
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
        <p className="informationSupport__text informationSupport__text-question">Ещё не зарегистрированы?</p>
        <NavLink to='/signup' className="informationSupport__text informationSupport__text-login effect">Регистрация</NavLink>
      </div>
    </>
  )


}

export default Login;