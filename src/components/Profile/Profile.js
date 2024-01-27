import './Profile.css';
import React from 'react';
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


  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4500);
    }
  }, [message])


  React.useEffect(() => {
    if (nameError || emailError || !name & !email) {
      setformNotValid(true);
    } else if (!name & email || name & !email) {
      setformNotValid(true);
    } else {
      setformNotValid(false);
    }
  }, [nameError, emailError, name, email]);



  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
    if (!isValidEmail) {
      setEmailError('Пожалуйста, введите корректный email адрес. Например: user.-2_@mail.ru');
    } else {
      setEmailError('');
    }
  }


  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('activeLink');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('isShortFilm');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('filterMyMovies')
    history('/', { replace: true })
  }

  function editProfile() {
    setSubmit(true)
  }

  function formExit() {
    setSubmit(false)
    setName('');
    setEmail('');
    setNameError('');
    setEmailError('');
    setformNotValid(true);
  }

  if (!currentUser) {
    return null;
  };

  function handleSubmit(e) {
    e.preventDefault();


    const updatedName = name  ? name : currentUser.name;
    const updatedEmail = email ? email : currentUser.email;

    api.update({ name: updatedName, email: updatedEmail })
      .then(res => {
        if (res.status === 400) {
          throw setMessage('Переданы некорректные данные при создании пользователя')
        } else if (res.status === 409) {
          throw setMessage('Пользователь с таким email уже существует')
        } else if (res.status === 429) {
          throw setMessage('Слишком частое обращение к серверу. Вы забанены на 15 минут.')
        } else if (res.status === 200) {
          return res.json()
        }
      })
      .then(res => {
        setMessage('Успех')
        setCurrentUser(res.data);
        setTimeout(() => {
          formExit()
        }, 1500)
      })
      .catch(() => {
        setTimeout(() => {
          setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }, 4501);
      })
  }


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
        />
        :
        <InfoProfile signOut={signOut} editProfile={editProfile} />
      }
    </main>
  )
}

export default Profile;