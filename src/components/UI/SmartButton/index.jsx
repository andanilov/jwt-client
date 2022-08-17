import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Loading from '../Loading';

const SmartButton = ({ delay, delayText, children, onClick, disabled, ...attr }) => {
  const ntrvl = useRef(null); // Current interval id
  const event = useRef(); // Button click event (argument for onClick)
  const [time, setTime] = useState(); // Current seconds left to apply
  const [wait, setWait] = useState(false); // To block button for wait onClick func response

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

  const toggleClick = (e) => {
    event.current = e;
    if (delay === 0) {
      return ApplyClick();
    }

    return (ntrvl.current
    ? killCounter(ntrvl.current)
    : (ntrvl.current = counter()));
  }

  const blockForAwaitResult = () => {
    setWait(true);
    onClick(event.current).then(() => setWait(false));
  };

  const ApplyClick = () => onClick[Symbol.toStringTag] === 'AsyncFunction'
    ? blockForAwaitResult()
    : onClick(event.current);

  // --
  // -- HOOKS
  // -- Apply click function
  useEffect(() => {
    if (time <= 0) {
      killCounter(ntrvl.current);
      ApplyClick();
    }
  }, [time]);

  // -- Clear interval if page exit
  useEffect(() => () => ntrvl.current && clearInterval(ntrvl.current), []);

  return (
    <Button
      disabled={disabled || !!wait}
      onClick={(e) => toggleClick(e)}
      {...attr}
    >
      {!!wait && <>{children} <Loading theme="light" inLine={true} size={3} /></>
        || (!!time && `${delayText} ${time}`)
        || children
      }
    </Button>);
};

SmartButton.propTypes = {
  delay: PropTypes.number,
  delayText: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

SmartButton.defaultProps = {
  delay: 0,
  delayText: 'Отменить',
  type: 'success',
  onClick: () => {},
  disabled: false,
};

export default SmartButton;
