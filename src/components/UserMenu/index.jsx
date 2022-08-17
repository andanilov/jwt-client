import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

import Access from '../Access';

const UserMenu = () => {
  const user = useSelector((state) => state.user.user);
  const { logout } = useAuth();

  return (
    <>
      {user.name ?? user.email}
      <Access>
        <Link to="/user/config">
          <span className="material-icons-outlined">account_circle</span>
        </Link>
      </Access>      
      <a href='#' onClick={logout}><span className="material-icons">logout</span></a>
    </>);
};

export default UserMenu;
