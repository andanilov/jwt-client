import React from 'react';
import PropTypes from 'prop-types';
import classes from './Alert.module.css';

const icon = {
  'info': 'notification_important',
  'error': 'do_not_disturb',
  'success': 'check_circle_outline',
};

const Alert = ({ children, type }) => !!children && (
  <div className={`${classes[type]} ${classes.alert}`}>
    {!!icon[type] && <span className="material-icons-outlined">{icon[type]}</span>}
    <div>
      {children}
    </div>
  </div>);

Alert.propTypes = {
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
