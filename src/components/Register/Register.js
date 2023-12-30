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
  const [message, setMessage] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formNotValid, setformNotValid] = React.useState(true);

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4500);
    }
  }, [message])

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
    if (e.target.validationMessage === 'Введите данные в указанном формате.') {
      setEmailError(`${e.target.validationMessage} Например: user@mail.ru`);
    } else {
      setEmailError(e.target.validationMessage);
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


  return (
    <main className='register'>
      <header className='header__register'>
        <NavLink to='/'>
          <img className="logo logo_place_header" src={HeaderLog} alt="Логотип" onClick={() => props.handleLinkClick(0)} />
        </NavLink>
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>
      <Form nameFor='register__form' nameId="registerForm" formId="registerForm" submitButtonLabel="Зарегистрироваться" formNotValid={formNotValid} message={message}>
        <label className="form__wrapper-register">
          <input required
          className={`form__input-register form__input-register_text_name ${nameError !== '' ? 'register_error' : ''}`}
          onChange={handleName}
          type="text"
          name="name"
          minLength="2"
          maxLength="30"  />
          <div className={`input__label-register ${name === '' ? '' : 'position'}`}>Имя</div>
          <p className='form__input-register_error'>{nameError}</p>
        </label>
        <label className="form__wrapper-register">
          <input required
          className={`form__input-register form__input-register_text_email ${emailError !== '' ? 'register_error' : ''}`}
          onChange={handleEmail}
          type="text"
          name="email"
          pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,}" />
          <div className={`input__label-register ${email === '' ? '' : 'position'}`}>E-mail</div>
          <p className='form__input-register_error'>{emailError}</p>
        </label>
        <label className="form__wrapper-register">
          <input required
          className={`form__input-register form__input-register_text_password ${passwordError !== '' ? 'register_error' : ''}`}
          onChange={handlePassword}
          type="password"
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