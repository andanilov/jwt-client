import React from 'react';
import PropTypes from 'prop-types';
import classes from './Alert.module.css';

const Alert = ({ children, type }) => (
  <div className={`${classes[type]} ${classes.alert}`}>
    {children}
  </div>
);

Alert.propTypes = {
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: '',
};

export default Alert;
