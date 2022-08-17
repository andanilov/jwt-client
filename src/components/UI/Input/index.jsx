import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Input.module.css';
import { useEffect } from 'react';

export default function Input({ 
  type,
  transparent,
  center,
  focus,
  toEnter,
  onKeyPress,
  ...attr
}) {
  const input = useRef();

  useEffect(() => { focus && input.current.focus(); }, []);

  return (
    <input
      ref={input}
      type={type}
      className={clsx(classes.input, {
        [classes.transparent]: transparent,
        [classes.center]: center,
      })}
      autoComplete={type === 'password' ? 'on' : 'off'}
      onKeyPress={(event) => {
        onKeyPress(event);
        event.key === 'Enter' && toEnter(event);
      }}
      { ...attr }
  />);
}

Input.propTypes = {
  type: PropTypes.string,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  focus: PropTypes.bool,
  onKeyPress: PropTypes.func,
  toEnter: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  transparent: false,
  center: false,
  focus: false,
  onKeyPress: () => {},
  toEnter: () => {},
};
