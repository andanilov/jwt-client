import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Button from '../../components/UI/Button';
import Table from '../../components/UI/Table';
import Wrapper from '../../components/Wrapper';
import { useUsers } from '../../hooks/useUsers';
import config from '../../conf';
import Log from '../../components/Log';

const UserList = () => {
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sortCol, setSortCol] = useState('name');
  const [sortType, setSortType] = useState('asc');

  const { getUsers, deleteUser } = useUsers();

  const toSort = () => setUsers(_.orderBy(users, sortCol, sortType));
  const goToSort = (col) => () => {
    if (col === sortCol) {
      setSortType(sortType === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortType('asc');
    }
  }

  const getUsersThead = () => ([
    { title: 'Email', align: 'left', fnClick: goToSort('email'), sorted: sortCol === 'email' ? sortType : '' },
    { title: 'Имя', align: 'left', fnClick: goToSort('name'), sorted: sortCol === 'name' ? sortType : '' },
    { title: 'Активация', fnClick: goToSort('isactivated'), sorted: sortCol === 'isactivated' ? sortType : '' },
    { title: 'Создан', fnClick: goToSort('created'), sorted: sortCol === 'created' ? sortType : '' },
    { title: 'Доступ', fnClick: goToSort('access'), sorted: sortCol === 'access' ? sortType : '' },
    { title: ' ', align: 'right' },
  ]);

  const loadUsers = async () => setUsers(await getUsers());
  const goToDeleteUser = (email) => async () => {
    await deleteUser(email, setErrors, setMessages) && await loadUsers();
  }

  // 1. User and thead loading
  useEffect(() => { (async function () { await loadUsers(); }()); }, []);
  
  // 2. Sort users
  useEffect(() => { toSort(); }, [sortCol, sortType]);

  // 3. Prepare users for table
  const usersTbody = !!users && users.reduce((usrs, { email, name, created, isactivated, access }) => {
    usrs[email] = [
      email,
      name,
      isactivated ? 'да' : 'нет',
      created,
      access ?? 0,
      (access < config.ADMIN_ACCESS)
        ? <Button type="error" onClick={goToDeleteUser(email)}>Удалить</Button>
        : '',
    ];
    return usrs;
  }, {});

  return (
    <Wrapper>
      <Log errors={errors} messages={messages} />
      {!!usersTbody && <Table data={usersTbody} headers={getUsersThead()} />}
    </Wrapper>);
};

export default UserList;
