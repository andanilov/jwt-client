import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUpAuthType, setAuthError, setAuthMessage } from '../../store/userSlice';
import classes from './UserAuthForms.module.css';
import { useAuth } from '../../hooks/useAuth';

import PopUpPanel from '../UI/PopUpPanel';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Alert from '../UI/Alert';

const titles = {
  'log': { title: 'Авторизация', btn: 'Войти' },
  'reg': { title: 'Регистрация', btn: 'Зарегистрироваться' },
  'rem': { title: 'Сбросить пароль', btn: 'Сбросить пароль' },
};

const UserAuthForms = () => {
  // -- Global state
  const dispatch = useDispatch();
  const popUpAuthType = useSelector(state => state.user.popUpAuthType);
  const authError = useSelector(state => state.user.authError);
  const authMessage = useSelector(state => state.user.authMessage);
  
  // -- Local State  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { registration, login, remember } = useAuth();

  const goToForm = (type = '') => () => {
    dispatch(setAuthError(''));
    dispatch(setAuthMessage(''));
    dispatch(setPopUpAuthType(type));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <PopUpPanel
        title={titles[popUpAuthType].title}
        isShowState={!!popUpAuthType}
        onClose={goToForm('')}
      >
        { authMessage && <Alert>{authMessage}</Alert>}
        { authError && <Alert type="error">{authError}</Alert>}

        <Input 
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        { popUpAuthType === 'reg' && <Input 
          name="name"
          placeholder="Имя!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> }
        { popUpAuthType !== 'rem' && <Input 
          name="password"
          placeholder="Пароль"
          type="password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />}       
        
        <div className={classes.btns}>
          { 
            popUpAuthType === 'reg' && (<>
                <Button type='success' onClick={() => registration(email, password, name)}>{titles['reg'].btn}</Button>
                <Button type='link' onClick={goToForm('log')}>{titles['log'].btn}</Button>
              </>)
            || popUpAuthType === 'log' && (<>
                <Button type='success' onClick={() => login(email, password)}>{titles['log'].btn}</Button>
                <Button type='link' onClick={goToForm('rem')}>{titles['rem'].btn}</Button>
                <Button type='link' onClick={goToForm('reg')}>{titles['reg'].btn}</Button>
              </>)
            || popUpAuthType === 'rem' && (<>
                <Button type='error' onClick={() => remember(email)}>{titles['rem'].btn}</Button>
                <Button type='link' onClick={goToForm('log')}>{titles['log'].btn}</Button>
              </>)
          }   
        </div>
      </PopUpPanel>
    </form>);
};

export default UserAuthForms;
