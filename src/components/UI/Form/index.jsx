import React from 'react';
import classes from './Form.module.css';

const Form = ({ children }) => (
  <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
    {children}
  </form>
);

export default Form;
