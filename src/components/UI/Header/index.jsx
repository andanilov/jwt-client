import React from 'react';
import PropTypes from 'prop-types';
import classes from './Header.module.css';

export default function Header({ children, size, align }) {
  return (
    <div className={classes.header}>
      <div className={`${classes['h' + size]} ${classes[align]}`}>
        {children}
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  size: PropTypes.number,
  align: PropTypes.string,
};

Header.defaultProps = {
  size: 1,
  align: 'center',
};
