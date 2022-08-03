import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

const Input = ({ type, fnChange, ...attr }) => (  
  <input
    type={type}
    onChange={fnChange}
    className={classes.input}
    autoComplete={type === 'password' ? 'on' : 'off'}
    { ...attr }
  />
);

Input.propTypes = {
  type: PropTypes.string,
  fnChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  fnChange: () => {},
};

export default Input;
