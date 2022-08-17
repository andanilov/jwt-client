import React from 'react';
import PropTypes from 'prop-types';
import classes from './TextBlock.module.css';

export default function TextBlock({ children, size, align }) {
  return !!children && (
    <div className={classes.textBlock}>
      <div className={`${classes['s' + size]} ${classes[align]}`}>
        {children}
      </div>
    </div>
  );
}

TextBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  size: PropTypes.number,
  align: PropTypes.string,
};

TextBlock.defaultProps = {
  children: '',
  size: 1,
  align: 'left',
};
