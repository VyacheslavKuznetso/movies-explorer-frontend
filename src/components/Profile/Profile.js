import './Profile.css';
import React from 'react';
import { useNavigate, } from 'react-router-dom';
import { AppContext } from '../../contexts/CurrentUserContext';
import FormProfile from './FormProfile/FormProfile';
import InfoProfile from './InfoProfile/InfoProfile'

function Profile({ setLoggedIn }) {

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
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (nameError || emailError || !name || !email) {
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
    if (e.target.validationMessage === 'Введите данные в указанном формате.') {
      setEmailError(`${e.target.validationMessage} Например: user@mail.ru`);
    } else {
      setEmailError(e.target.validationMessage);
    }
  }


  function signOut() {
    setLoggedIn(false);
    history('/', { replace: true })
  }

  function editProfile() {
    setSubmit(true)
  }

  function formExit() {
    setSubmit(false)
    setName(currentUser.name);
    setEmail(currentUser.email);
    setNameError('');
    setEmailError('')
  }

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name} !</h1>
      {submit
        ?
        <FormProfile
        name={name}
        email={email}
        nameError={nameError}
        emailError={emailError}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        formExit={formExit}
        message={message}
        formNotValid={formNotValid} />
        :
        <InfoProfile signOut={signOut} editProfile={editProfile} />
      }
    </main>
  )
}

export default Profile;