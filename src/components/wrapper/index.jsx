import React from 'react';
import classes from './Wrapper.module.css';

import UserPanel from '../UserPanel';
import { Link } from 'react-router-dom';

const Wrapper = ({ children }) => (
  <div className={classes.body}>
		<header className={classes.header}>

			<div className={classes.leftSide}>
				JWT
			</div>

      <div className={classes.centerSide}>
        <Link to="/" >Главная</Link>
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
