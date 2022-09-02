import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import config from '../../conf';
import { useUsers } from '../../hooks/useUsers';
import { useAlert } from '../../components/UI/Alert/AlertContext';

import Wrapper from '../../components/Wrapper';
import Alert from '../../components/UI/Alert';

import Table from '../../components/UI/Table';
import SmartButton from '../../components/UI/SmartButton';
import Loading from '../../components/UI/Loading';
import Redactable from '../../components/UI/Redactable';
import Header from '../../components/UI/Header';
import TextBlock from '../../components/UI/TextBlock';
import Space from '../../components/UI/Space';

const UserList = () => {
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState();
  const [sortCol, setSortCol] = useState();
  const [sortType, setSortType] = useState('asc');

  const { alertBind, setAlert } = useAlert();
  useEffect(() => setAlert(), []);

  const { getUsers, deleteUser, changeUserData } = useUsers();

  // --
  // -- METHODS -- 
  const toSort = () => setUsers(_.orderBy(users, sortCol, sortType));

  const handlerSort = (col) => () => {
    console.log('SORT by ', col);
    if (col === sortCol) {
      setSortType(sortType === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortType('asc');
    }
  };

  const getUsersThead = () => ([
    { title: 'Email', align: 'left', fnClick: handlerSort('email'), sorted: sortCol === 'email' ? sortType : '' },
    { title: 'Имя', align: 'left', fnClick: handlerSort('name'), sorted: sortCol === 'name' ? sortType : '' },
    { title: 'Активация', fnClick: handlerSort('isactivated'), sorted: sortCol === 'isactivated' ? sortType : '' },
    { title: 'Создан', fnClick: handlerSort('created'), sorted: sortCol === 'created' ? sortType : '' },
    { title: 'Доступ', fnClick: handlerSort('access'), sorted: sortCol === 'access' ? sortType : '' },
    { title: ' ', align: 'right' },
  ]);

  const loadUsers = async () => setUsers(await getUsers());
  
  const handlerDeleteUser = (email) => async () => {
    await deleteUser(email);
    await loadUsers();
  }

  const handlerChangeAccess = async (email, access = 0) => {
    await changeUserData({
      actor: user.email,
      user: email,
      access: +access,
    });
    await loadUsers();
  }
  
  // --
  // -- HOOKS --
  // 0. Clear Alerts
  useEffect(() => () => setAlert(), []);

  // 1. User and thead loading
  useEffect(() => { (async function () {
    await loadUsers();
    handlerSort('email')();
  }()); }, []);
  
  // 2. Sort users
  useEffect(() => { toSort(); }, [sortCol, sortType]);

  // 3. Prepare users for table
  const usersTbody = useMemo(() => !!users && users.reduce((usrs, { email, name, created, isactivated, access }) => {
    usrs[email] = [
      email,
      name,
      isactivated ? 'да' : 'нет',
      created,
      access >= config.ADMIN_ACCESS
        ? 'администратор'
        : <Redactable
          type="number"
          min="0"
          max="99"
          size="2"
          defaultValue={access ?? 0}
          onBlur={(event) => email
            && +event.target.value !== access
            && handlerChangeAccess(email, event.target.value)}
          transparent={true}
          center={true}
          onKeyPress={(event) => event?.key === 'Enter' && event.target.blur()}
        />,
      (access < config.ADMIN_ACCESS)
        ? <SmartButton
          type="error"
          onClick={handlerDeleteUser(email)}
          delay={5}
          >
            Удалить
          </SmartButton>
        : '',
    ];
    return usrs;
  }, {}), [users]);

  return (
    <Wrapper>
      <Header>Список пользователей</Header>
      <TextBlock>
        Здесь представлены все пользователи системы.
        После регистрации пользователь получает права доступа = 0.
        Администратор системы может просматривать / редактировать доступ / удалять пользователей<br/><br/>
        <strong>0</strong> - Гость (Вход / Выход / Активация Email)<br/>
        <strong>1 - 99</strong> - Пользователь<br/>
        <strong>100 +</strong> - Администратор<br/>
      </TextBlock>
      <Space sizeEm="1"/>
      <Alert {...alertBind} />      
      {(!users?.length || !Object.keys(usersTbody)?.length)
        ? <Loading />
        : <Table data={usersTbody} headers={getUsersThead()} />
      }
    </Wrapper>);
};

export default UserList;
