import React from 'react';
import PropTypes from 'prop-types';
import classes from './PopUpPanel.module.css';

const PopUpPanel = ({ children, title, isShowState, onClose }) => {

  const handlerClose = (event) => event.target.tagName === 'SECTION' && onClose();

  return (
    <section className={classes.section} onClick={(event) => handlerClose(event) }>
      <div id='popUpBody' className={classes.body}>      
        { title && (
          <div className={classes.title}>
            {title}
          </div>)
        }
        {children}
      </div>
    </section>
  );
}

PopUpPanel.propTypes = {
  title: PropTypes.string,
};

export default PopUpPanel;
