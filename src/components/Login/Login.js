import './Login.css';
import HeaderLog from '../../images/logo.svg';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import api from '../../utils/MainApi';

function Login({ handleLinkClick, setLoggedIn }) {
  const history = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formNotValid, setformNotValid] = React.useState(true);

  React.useEffect(() => {
    if (emailError || passwordError || !email || !password) {
      setformNotValid(true);
    } else {
      setformNotValid(false);
    }
  }, [emailError, passwordError, email, password]);



  function handleEmail(e) {
    setEmail(e.target.value);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
    if (!isValidEmail) {
      setEmailError('Пожалуйста, введите корректный email адрес. Например: user.-2_@mail.ru');
    } else {
      setEmailError('');
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  function loginExit() {
    setEmailError('');
    setPasswordError('');
  }

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4500)
    }
  }, [message])

  function handleSubmit(e) {
    e.preventDefault();

    api.login({ email, password })
      .then(res => {
        if (res.token) {
          setTimeout(() => {
            setMessage('Успех');
          }, 2225);
          setTimeout(() => {
            setLoggedIn(true)
            handleLinkClick(1)
            history('/movies', { replace: true });
            setEmail('');
            setPassword('');
          }, 4501);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          if (err === 'Ошибка: 401') {
            setMessage('Неправильные почта или пароль');
          } else if (err === 'Ошибка: 400') {
            setMessage('Переданы некорректные данные');
          } else {
          setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
          }
        }, 4501);
      })
      .finally(() => {
        setformNotValid(true)
      });
  }


  return (
    <main className='login'>
      <header className='header__login'>
        <NavLink to='/'>
          <img className="logo logo_place_header" src={HeaderLog} alt="Логотип" onClick={() => handleLinkClick(0)} />
        </NavLink>
        <h1 className='login__title'>Рады видеть!!</h1>
      </header>
      <Form nameFor='login__form' nameId="loginForm" formId="loginForm" submitButtonLabel="Войти" formNotValid={formNotValid} handleSubmit={handleSubmit} message={message}>
        <label className="form__wrapper-login">
          <input required
            className={`form__input-login form__input-login_text_email ${emailError !== '' ? 'login_error' : ''}`}
            onChange={handleEmail}
            type="text"
            value={email}
            name="email"
            pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
          <div className={`input__label-login ${email === '' ? '' : 'position'}`}>E-mail</div>
          <p className='form__input-login_error'>{emailError}</p>
        </label>
        <label className="form__wrapper-login">
          <input required
            className={`form__input-login form__input-login_text_password ${passwordError !== '' ? 'login_error' : ''}`}
            onChange={handlePassword}
            type="password"
            value={password}
            name="password"
            minLength="5"
            maxLength="12" />
          <div className={`input__label-login ${password === '' ? '' : 'position'}`}>Password</div>
          <p className='form__input-login_error'>{passwordError}</p>
        </label>
      </Form>
      <div className="informationSupport">
        <p className="informationSupport__text informationSupport__text-question">Ещё не зарегистрированы?</p>
        <NavLink to='/signup' className="informationSupport__text informationSupport__text-login effect" onClick={loginExit}>Регистрация</NavLink>
      </div>
    </main>
  )


}

export default Login;