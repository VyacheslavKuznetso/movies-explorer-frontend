import './Register.css';
import HeaderLog from '../../images/logo.svg';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import api from '../../utils/MainApi';

function Register(props) {

  const history = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formNotValid, setformNotValid] = React.useState(true);
  const [message, setMessage] = React.useState('');


  React.useEffect(() => {
    if (nameError || emailError || passwordError || !name || !email || !password) {
      setformNotValid(true);
    } else {
      setformNotValid(false);
    }
  }, [nameError, emailError, passwordError, name, email, password]);

  function handleName(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }


  function handleEmail(e) {
    setEmail(e.target.value);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
    if (!isValidEmail) {
      setEmailError('Пожалуйста, введите корректный email адрес. Например: user@mail.ru');
    } else {
      setEmailError('');
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  function registerExit() {
    setNameError('');
    setEmailError('');
    setPasswordError('');
  }

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 5500)
    }
  }, [message])

  function handleSubmit(e) {
    e.preventDefault();

    api.register({ name, email, password })
      .then(res => {

        if (res.status === 201) {
          return res.json();
        }

        api.login({ email, password })
          .then(res => {
            if (res.token) {
              setTimeout(() => {
                setMessage('Успех');
              }, 2225);
              setTimeout(() => {
                props.setLoggedIn(true)
                props.handleLinkClick(1)
                history('/movies', { replace: true });
                setName('');
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
          });
      })
      .catch((err) => {
        setTimeout(() => {
          if (err === 'Ошибка: 400') {
            setMessage('Переданы некорректные данные');
          } else if (err === 'Ошибка: 409') {
            setMessage('Пользователь с таким email уже существует');
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
    <main className='register'>
      <header className='header__register'>
        <NavLink to='/'>
          <img className="logo logo_place_header" src={HeaderLog} alt="Логотип" onClick={() => props.handleLinkClick(0)} />
        </NavLink>
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>
      <Form nameFor='register__form' nameId="registerForm" formId="registerForm" submitButtonLabel="Зарегистрироваться" formNotValid={formNotValid} handleSubmit={handleSubmit} message={message}>
        <label className="form__wrapper-register">
          <input required
            className={`form__input-register form__input-register_text_name ${nameError !== '' ? 'register_error' : ''}`}
            onChange={handleName}
            type="text"
            value={name}
            name="name"
            minLength="2"
            maxLength="30" />
          <div className={`input__label-register ${name === '' ? '' : 'position'}`}>Имя</div>
          <p className='form__input-register_error'>{nameError}</p>
        </label>
        <label className="form__wrapper-register">
          <input required
            className={`form__input-register form__input-register_text_email ${emailError !== '' ? 'register_error' : ''}`}
            onChange={handleEmail}
            type="text"
            value={email}
            name="email"
            pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
          <div className={`input__label-register ${email === '' ? '' : 'position'}`}>E-mail</div>
          <p className='form__input-register_error'>{emailError}</p>
        </label>
        <label className="form__wrapper-register">
          <input required
            className={`form__input-register form__input-register_text_password ${passwordError !== '' ? 'register_error' : ''}`}
            onChange={handlePassword}
            type="password"
            value={password}
            name="password"
            minLength="5"
            maxLength="12" />
          <div className={`input__label-register ${password === '' ? '' : 'position'}`}>Password</div>
          <p className='form__input-register_error'>{passwordError}</p>
        </label>
      </Form>
      <div className="informationSupport">
        <p className="informationSupport__text informationSupport__text-question">Уже зарегистрированы?</p>
        <NavLink to='/signin' className="informationSupport__text informationSupport__text-login effect" onClick={registerExit}>Войти</NavLink>
      </div>
    </main>
  )

}

export default Register;