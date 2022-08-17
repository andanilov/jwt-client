import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Select.module.css';

export default function Select ({ options, title, transparent, center, focus, ...attr }) {
  const select = useRef();

  useEffect(() => { focus && select.current.focus(); }, []);

  return (
    <select
      ref={select}
      className={clsx(classes.select, {
        [classes.transparent]: transparent,
        [classes.center]: center,
      })}
      { ...attr }
    >
      {title && <option value="">{title}</option>}
      {options.map(({ value, title, selected }) => <option key={value} value={value}>{title}</option>)}      
    </select>);    
}

Select.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  focus: PropTypes.bool,
};

Select.defaultProps = {
  title: '',
  options: [],
  transparent: false,
  center: false,
  focus: false,
};
