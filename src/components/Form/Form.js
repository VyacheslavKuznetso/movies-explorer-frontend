import './Form.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function RegisterForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <form className={`form ${props.nameFor}`} nameId={props.nameId} formId={props.formId}>
        {props.children}
        <button className={`form__submit-button ${props.nameFor === 'login__form' ? 'form__submit-button_login' : ''} effect`} type="submit">{props.submitButtonLabel}</button>
      </form>
    </>
  )
}

export default RegisterForm;