import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { registration, login, logout } = useAuth();

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} >
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <div>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div> */}
      <div>
        <input
          type="password"
          placeholder="пароль"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => login(email, password)}>Логин</button>
      <button onClick={() => registration(email, password, name)}>Регистрация</button>
      </form>
    </div>
  );
}

export default LoginForm ;
