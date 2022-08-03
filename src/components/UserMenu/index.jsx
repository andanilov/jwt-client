import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import config from '../../conf';
import { useAuth } from '../../hooks/useAuth';

const UserMenu = () => {
  const user = useSelector((state) => state.user.user);
  const { logout } = useAuth();

  return (
    <>
      {user.name ?? user.email}
      {!!(user.access && user.access >= config.ADMIN_ACCESS) && 
        <Link to="/user/list"><span className="material-icons-outlined">people_alt</span></Link>
      }
      <Link to="/user/config"><span className="material-icons-outlined">account_circle</span></Link>
      <a href='#' onClick={logout}><span className="material-icons">logout</span></a>
    </>);
};

export default UserMenu;
