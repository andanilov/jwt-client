import React from 'react';
import classes from './Wrapper.module.css';

import UserPanel from '../UserPanel';


const Wrapper = ({ children }) => (
	<div>
		<header className={classes.header}>
			<div className={classes.userPanel}>
				<UserPanel />
			</div>
		</header>
		<section>
			{children}
		</section>
	</div>
);

export default Wrapper;
