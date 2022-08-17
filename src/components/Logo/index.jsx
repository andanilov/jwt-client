import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Logo.module.css';

const Logo = () => (
  <NavLink to="/" className={({ isActive }) =>
    classes.logo + ' ' + (isActive ? classes.active : '')}>
    +GF<span>app</span>+
  </NavLink>
);

export default Logo;
