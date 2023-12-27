import './Profile.css';
import React from 'react';
import { useNavigate, } from 'react-router-dom';
import { AppContext } from '../../contexts/CurrentUserContext';

function Profile({ setLoggedIn }) {

  const currentUser = React.useContext(AppContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const history = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function signOut() {
    setLoggedIn(false);
    history('/', { replace: true })
  }

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name} !</h1>
      <form className='profile__form' >
        <div className='profile__field'>
          <label className='profile__info'>Имя</label>
          <input required className='profile__input' type="text" value={name} onChange={handleNameChange} />
        </div>
        <p className='register__error'></p>
        <div className='profile__field'>
          <label className='profile__info'>E-mail</label>
          <input required className='profile__input' type="text" value={email} onChange={handleEmailChange} />
        </div>
        <p className='register__error'></p>
        <button className='profile__edit  effect profile__edit_error' type="submit">Редактировать</button>
      </form>
      <div className='profile__logout  effect' onClick={signOut}>Выйти из аккаунта</div>
    </main>
  )
}

export default Profile;