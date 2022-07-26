import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import classes from './UserPanel.module.css';

import UserAuthMenu from '../UserAuthMenu';
import UserAuthForms from '../UserAuthForms';
import UserMenu from '../UserMenu';

const UserPanel = () => {
  const user = useSelector(state => state.user.user);
  const popUpAuthType = useSelector(state => state.user.popUpAuthType);

  return user && Object.keys(user)?.length
    ? <UserMenu/>
    : (
      <div>
        !!! - {popUpAuthType}
        <UserAuthMenu/>
        { popUpAuthType && <UserAuthForms/> }
      </div>);
}

export default UserPanel;
