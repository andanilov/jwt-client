import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = ({ children, type, onClick, disabled, center }) => (
  <button
    className={`${classes[type]} ${classes.button} ${center ? classes.center : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  center: PropTypes.bool,
};

Button.defaultProps = {
  type: 'info',
  onClick: () => {},
  disabled: false,
  center: false,
};

export default Button;
