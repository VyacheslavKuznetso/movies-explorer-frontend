import './Profile.css';
import React, { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { AppContext } from '../../contexts/CurrentUserContext';
import FormProfile from './FormProfile/FormProfile';
import InfoProfile from './InfoProfile/InfoProfile';
import api from '../../utils/MainApi';

function Profile({ setLoggedIn, setCurrentUser }) {

  const currentUser = React.useContext(AppContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const history = useNavigate();
  const [submit, setSubmit] = React.useState(false)

  const [message, setMessage] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [formNotValid, setformNotValid] = React.useState(true);



  useEffect(() => {
    if(currentUser) {
      setName(currentUser.name)
      setEmail(currentUser.email)
    }
  }, [currentUser])


  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4500);
    }
  }, [message])


  useEffect(() => {
    if (nameError || emailError || !name & !email) {
      setformNotValid(true);
    } else if (!name & email || name & !email) {
      setformNotValid(true);
    } else if (currentUser.email === email && currentUser.name === name) {
      setformNotValid(true);
    } else {
      setformNotValid(false);
    }
  }, [nameError, emailError, name, email]);



  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    console.log(currentUser.name !== name);
    const isNameChanged = currentUser.name === e.target.value;;
    console.log(isNameChanged);
    if(isNameChanged) {
      setNameError('По сравнению с текущим именем, данные не изменены.');

    }
  }

  function handleEmailChange(e) {
    // setNewEmail(e.target.value);
    setEmail(e.target.value);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
    const isEmailChanged = currentUser.email === e.target.value;
    console.log(isEmailChanged);
    if (!isValidEmail) {
      setEmailError('Пожалуйста, введите корректный email адрес. Например: user.-2_@mail.ru');
    } else if (isEmailChanged) {
      setEmailError('По сравнению с текущим email, данные не изменены.');

    } else{
      setEmailError('');
    }
  }


  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('activeLink');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('isShortFilm');
    localStorage.removeItem('isShortMyFilm');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('filterMyMovies');
    history('/', { replace: true })
  }

  function editProfile() {
    setSubmit(true)
  }

  function formExit() {
    setSubmit(false)
    setNameError('');
    setEmailError('');
    setformNotValid(true);
  }




  function handleSubmit(e) {
    e.preventDefault();

    setformNotValid(true)

    const updatedName = name ? name : currentUser.name;
    const updatedEmail = email ? email : currentUser.email;

    api.update({ name: updatedName, email: updatedEmail })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then(res => {
        setTimeout(() => {
          setMessage('Успех')
        }, 2000)
        setTimeout(() => {
          setCurrentUser(res.data);
          formExit()
        }, 4501)
      })
      .catch((err) => {
        setTimeout(() => {
          if (err === 'Ошибка: 400') {
            setMessage('Переданы некорректные данные при создании пользователя')
          } else if (err === 'Ошибка: 409') {
            setMessage('Пользователь с таким email уже существует')
          } else if (err === 'Ошибка: 429') {
            setMessage('Слишком частое обращение к серверу. Вы забанены на 15 минут.')
          } else {
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
          }
        }, 4501);
      })
  }

  if (!currentUser) {
    return null;
  };


  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      {submit
        ?
        <FormProfile
          handleSubmit={handleSubmit}
          nameError={nameError}
          emailError={emailError}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          formExit={formExit}
          message={message}
          formNotValid={formNotValid}
          name={name}
          email={email}
        />
        :
        <InfoProfile signOut={signOut} editProfile={editProfile} />
      }
    </main>
  )
}

export default Profile;