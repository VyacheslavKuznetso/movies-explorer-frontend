import './Form.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Form(props) {

  return (
    <>
      <form className={`form ${props.nameFor}`} nameId={props.nameId} formId={props.formId} onSubmit={props.handleSubmit} noValidate >
        {props.children}
        <button className={`form__submit-button ${props.formNotValid ? 'form__submit-button_disabled' : ''} ${props.nameFor === 'login__form' ? 'form__submit-button_login' : ''} animation`} type="submit" disabled={props.formNotValid}>{props.message ? props.message : props.submitButtonLabel}</button>
      </form>
    </>
  )
}

export default Form;