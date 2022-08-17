import React from 'react';
import classes from './Form.module.css';

const Form = ({ children, ...attr }) => (
  <form
    className={classes.form}
    onSubmit={(event) => event.preventDefault()}
    {...attr}
  >
    {children}
  </form>
);

export default Form;
