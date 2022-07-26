import React from 'react';
import classes from './Input.module.css';

const Input = ({ ...attr }) => (
  <input { ...attr } className={classes.input}/>
);

export default Input;
