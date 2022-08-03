import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = ({ children, type, onClick, disabled }) => (
  <button
    className={`${classes[type]} ${classes.button}`}
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
};

Button.defaultProps = {
  type: 'info',
  onClick: () => {},
  disabled: false,
};

export default Button;
