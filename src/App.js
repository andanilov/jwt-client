import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from './hooks/useAuth';
import { useUsers } from './hooks/useUsers';

import './App.css';

import Wrapper from './components/wrapper';
import LoginForm from './components/LoginForm';

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const isLoading = useSelector(state => state.user.isLoading);
  const user = useSelector(state => state.user.user);
  const [users, setUsers] = useState();
  const { checkAuth, logout } = useAuth();
  const { getUsers } = useUsers();

  // -- Check if user authorized now and set accesToken (Only for first run)
  useEffect(() => { localStorage.getItem('token') && checkAuth(); }, []);

  return (
    <Wrapper>
      {
        (isLoading && (<h1>Загрузка ...</h1>))
        || (isAuth && user && !user.isactivated && (<h2>Активируйтесь через почту!</h2>))
        || isAuth && user && (
          <div>
            <h1>Привет {user.name}</h1>
            <div>Email: {user.email}</div>
            <div>Активация: {user.isactivated ? 'да' : 'нет'}</div>
            <div><button onClick={async () => setUsers(await getUsers())}>Получить пользователей (закрытые данные)!</button></div>
            <div><button onClick={logout}>Выйти</button></div>
            { users?.length && (
              <div>
                <h2>Пользователи</h2>
                { users.map(({ email, name, isactivated }) => <div key={email}>{email} / {name} / {isactivated ? 'Активирован' : 'не активирован'}</div>)}
              </div>
              )
            }
          </div>)
        || (
          <div>
            <h1>Авторизируйтесь!</h1>
            <LoginForm/>
            <div><button onClick={async () => setUsers(await getUsers())}>Получить пользователей (закрытые данные)!</button></div>
          </div>)
      }
    </Wrapper>
  );

  // if (isLoading) {
  //   return <h1>Загрузка ...</h1>;
  // }

  // if (isAuth && user && !user.isactivated) {
  //   return <h2>Активируйтесь через почту!</h2>;
  // }

  // if (isAuth && user) {
  //   return (
  //     <Wrapper>
  //       <div>
  //         <h1>Привет {user.name}</h1>
  //         <div>Email: {user.email}</div>
  //         <div>Активация: {user.isactivated ? 'да' : 'нет'}</div>
  //         <div><button onClick={async () => setUsers(await getUsers())}>Получить пользователей (закрытые данные)!</button></div>
  //         <div><button onClick={logout}>Выйти</button></div>
  //         { users?.length && (
  //           <div>
  //             <h2>Пользователи</h2>
  //             { users.map(({ email, name, isactivated }) => <div key={email}>{email} / {name} / {isactivated ? 'Активирован' : 'не активирован'}</div>)}
  //           </div>
  //           )
  //         }
  //       </div>
  //     </Wrapper>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>Авторизируйтесь!</h1>
  //     <LoginForm/>
  //     <div><button onClick={async () => setUsers(await getUsers())}>Получить пользователей (закрытые данные)!</button></div>
  //   </div>
  // );
};

export default App;
