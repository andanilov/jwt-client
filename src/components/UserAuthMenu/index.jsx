import React from 'react';
import { useDispatch } from 'react-redux';
import { setPopUpAuthType } from '../../store/userSlice';

const UserAuthMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <a href='#' onClick={() => dispatch(setPopUpAuthType('log'))}>Вход</a>&nbsp;
      <a href='#' onClick={() => dispatch(setPopUpAuthType('reg'))}>Регистрация</a>
    </>);
};

export default UserAuthMenu;
