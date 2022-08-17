import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const ButtonDelay = ({ delay, delayText, children, onClick, ...attr }) => {
  const ntrvl = useRef(null); // Current interval id
  const [time, setTime] = useState(); // Current seconds left to apply

  // --
  // -- METHODS
  const counter = () => {
    setTime(delay);
    return setInterval(() => setTime((prevState) => prevState - 1), 1000);
  };
  const killCounter = (counterId) => {
    clearInterval(counterId);
    setTime();
    ntrvl.current = null;
  };
  const toggleClick = () => (ntrvl.current
    ? killCounter(ntrvl.current)
    : (ntrvl.current = counter()));

  // --
  // -- HOOKS
  // -- Apply click function
  useEffect(() => {
    if (time <= 0) {
      killCounter(ntrvl);
      onClick();
    }
  }, [time]);

  // -- Clear interval if page exit
  useEffect(() => () => ntrvl.current && clearInterval(ntrvl.current), []);

  return (
    <Button onClick={toggleClick} {...attr}>
      {time ? `${delayText} ${time}` : children}
    </Button>);
};

ButtonDelay.propTypes = {
  delay: PropTypes.number,
  delayText: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonDelay.defaultProps = {
  delay: null,
  delayText: 'Отменить',
  type: 'success',
  onClick: () => {},
};

export default ButtonDelay;