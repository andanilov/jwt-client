import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Redactable.module.css';
import Input from '../Input';

export default function Redactable({ onBlur, ...attr }) {
  const [input, setInput] = useState(false);

  const handleBlur = useCallback((event) => {
    setInput(false);
    onBlur(event);
  }, []);

  return (
    <>
      {input
        ? <Input {...attr} onBlur={handleBlur} focus={true}/>
        : <span onClick={() => setInput(true)} className={classes.title}>
            <span className={classes.text}>{attr?.value ?? attr?.defaultValue ?? ''}</span>
            <span className={`${classes.icon} material-icons-outlined`}>edit_note</span>
          </span>
      }
    </>);  
}

Redactable.propTypes = {
  onBlur: PropTypes.func,
};

Redactable.defaultProps = {
  onBlur: () => {},
};
