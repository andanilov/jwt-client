import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './MainMenu.module.css';
import config from '../../conf';

const menu = [
  { to: '/pdf', access: 1, title: 'Создать PDF', icon: 'picture_as_pdf' },
  { to: '/adddb', access: config.ADMIN_ACCESS, title: 'Дополнить БД', icon: 'app_registration' },
  { to: '/user/list', access: config.ADMIN_ACCESS, title: 'Пользователи', icon: 'people_alt' },
];

export default function() {
  const user = useSelector((state) => state.user.user);

  return menu.map(({ to, icon, title, access }) => !!user && user.access >= access && (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) => classes.link + ' ' + (isActive ? classes.active : '')}
      title={title}
    >
      <span className={`material-icons-outlined ${classes.icon}`}>{icon}</span>
    </NavLink>
  ))
};

// export default MainMenu;
