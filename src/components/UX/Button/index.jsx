import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = ({ children, type, onClick }) => (
  <button className={`${classes[type]} ${classes.button}`} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'info',
  onClick: () => {},
};

export default Button;
