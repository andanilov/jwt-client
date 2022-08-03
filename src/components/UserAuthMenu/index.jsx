import React from 'react';
import { useDispatch } from 'react-redux';
import { setPopUpAuthType } from '../../store/userSlice';

const UserAuthMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <a href='#' title='Войти' onClick={() => dispatch(setPopUpAuthType('log'))}>
        <span className="material-icons">login</span>
      </a>
      <a href='#' title='Регистрация' onClick={() => dispatch(setPopUpAuthType('reg'))}>
        <span className="material-icons-outlined">person_add_alt</span>
      </a> 
    </>);
};

export default UserAuthMenu;
