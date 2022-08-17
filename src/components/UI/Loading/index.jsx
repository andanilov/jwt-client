import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Loading.module.css';

const Loading = ({ size, theme, inLine, overlay }) => (
  <div className={clsx({
    [classes.area]: !inLine,
    [classes.overlay]: overlay,
    })}
  >
    <div className={`${classes['lds-ellipsis']} ${classes['h' + size]} ${classes[theme]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>);

Loading.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.string,
  overlay: PropTypes.bool,
};

Loading.defaultProps = {
  size: 1,
  theme: 'dark',
  overlay: false,
};

export default Loading;
