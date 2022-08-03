import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const ButtonDelay = ({ delay, delayText, children, onClick, ...attr }) => {
  const [dlOutput, setDlOutput] = useState(null);
  // const [intrvl, setIntrvl] = useState(null);

  var test = null;

  // const [state, dispatch] = useReducer((state, action) => ({ interval: action.payload }), { interval: null }); 
  // useEffect(() => { console.log('Change: ', state.interval) }, [state.interval]);


  if (delay < 1 || !onClick) {
    return <Button onClick={onClick} { ...attr }>{children}</Button>
  }


  const clearDelay = (i = null) => {
console.log('Im gonna delete: ', i, test);
    clearInterval(i || test);
    setDlOutput(null);
    test = null;
console.log('After delete: ', i, test);
  };

  // -- Add delay for onClick function 
  const dlOnClick = (i) => {    
    console.log('Enter: ', i, test);

    // -- Cancel pressed
    if (i) {
      console.log('Go to delete: ', i, test);      
      return clearDelay(i);
    }

    // -- Generate delay
    setDlOutput(delay);
    let dl = delay;

    test = setInterval(() => {
        dl -= 1;
        setDlOutput((prevState) => dl);      

        if (dl <= 0) {
          onClick();
          // console.log('Im gonna delete: ', intrvl);
          clearDelay(test);
        }
      }, 1000); 

    console.log('Created test = ', test);
  }; 

  return (
    <>
    <Button onClick={() => dlOnClick(test)} { ...attr } >
      {delayText && dlOutput ? delayText : children}
      {dlOutput ? ` ${dlOutput}` : ''}
    </Button>
    </>
  );





  // return (
  //   <Button { ...attr }>
  //     {children}
  //   </Button>
  // );
};

ButtonDelay.propTypes = {
  delay: PropTypes.number,
  delayText: PropTypes.string,
};

ButtonDelay.defaultProps = {
  delay: 0,
  delayText: '',
};


export default ButtonDelay;
