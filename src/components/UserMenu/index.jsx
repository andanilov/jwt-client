import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

const UserMenu = () => {
  const user = useSelector((state) => state.user.user);
  const { logout } = useAuth();

  return (
    <>
      Привет, {user.name ?? user.email} 
      <a href='#' onClick={logout}>Выход</a>
    </>);
};

export default UserMenu;
