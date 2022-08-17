import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Wrapper.module.css';

import UserPanel from '../UserPanel';
import Logo from '../Logo';
import MainMenu from '../MainMenu';

const Wrapper = ({ children }) => (
  <div className={classes.body}>
	  <header className={classes.header}>
	    <div className={classes.leftSide}>
        <Logo />
	    </div>

      <div className={classes.centerSide}>
        <MainMenu />        
      </div>
			
		<div className={classes.rightSide}>
			<UserPanel />
		</div>
      
		</header>
		<section>
      {children}
		</section>
	</div>
);

export default Wrapper;
