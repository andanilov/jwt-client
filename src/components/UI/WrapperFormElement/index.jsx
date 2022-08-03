import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './WrapperFormElement.module.css';

const WrapperFormElement = ({ label, help, width, required, children }) => (
  <div
    style={{ width }}
    className={clsx(classes.area, {
      [classes.required]: required,
    })} 
  >
    {label && <label>{label}</label>}
    {children}
    {help && <span>{help}</span>}
  </div>
);

WrapperFormElement.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  width: PropTypes.string,
  required: PropTypes.bool,
};

WrapperFormElement.defaultProps = {
  label: '',
  help: '',
  width: '100%',
  required: false,
};


export default WrapperFormElement;
