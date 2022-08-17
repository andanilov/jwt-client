import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '../../components/UI/Alert';
import { useAlert } from '../../components/UI/Alert/AlertContext';
// import Button from '../../components/UI/Button';
import SmartButton from '../../components/UI/SmartButton';
import Form from '../../components/UI/Form';
import Header from '../../components/UI/Header';
import Input from '../../components/UI/Input';
import Space from '../../components/UI/Space';
import TextBlock from '../../components/UI/TextBlock';
import WrapperFormElement from '../../components/UI/WrapperFormElement';
import Wrapper from '../../components/Wrapper';

import { useUsers } from '../../hooks/useUsers';

const UserConfig = () => {
  const user = useSelector((state) => state.user.user);
  const [password, setPassword] = useState('');

  const { alertBind, setAlert } = useAlert();
  const { changeUserData } = useUsers();

  const inputPassword = (event) => setPassword(event.target.value.trim());

  const goToChangeData = async (event) => {
    // 1. Clear errors and messages
    setAlert();

    // 2. Get form rows
    const { name, newPassword, newPassword2 } = event.target.form;

    // 3. If new passwords exist and different
    if (newPassword.value.trim() !== newPassword2.value.trim()) {
      return setAlert('Новые пароли не совпадают!', 'error');
    }

    // 4. Send request to change data
    await changeUserData({
      actor: user.email,
      user: user.email,
      password,
      name: name.value,
      newPassword: newPassword.value,
    });

    // 5. Reset password
    setPassword('');
  };

  return (
    <Wrapper>
      <div>
        <Header>Личная информация</Header>
        <TextBlock>Здесь Вы сможете изменить личную информацию и данные для доступа в систему. Для применения изменений необходимо ввести текущий пароль!</TextBlock>
        <Alert {...alertBind} />
        <Space />
        {user?.email &&
          <Form>          
            <WrapperFormElement
              label="Email"
              help="Email - Ваш идентификатор в системе, не может быть изменён для данного аккаунта."          
              width="50%"
            >
              <Input name="email" value={user.email} disabled />
            </WrapperFormElement>

            <WrapperFormElement label="Имя" width="50%">
              <Input name="name" defaultValue={user.name || ''} />
            </WrapperFormElement>

            <WrapperFormElement
              label="Новый пароль"
              width="50%"
              help="Для изменения пароля введите новый пароль"
            >
              <Input name="newPassword" type="password" />
            </WrapperFormElement>

            <WrapperFormElement
              label="Новый пароль (повтор)"
              width="50%"
              help="Повторите новый пароль"
            >
              <Input name="newPassword2" type="password" />
            </WrapperFormElement>

            <WrapperFormElement
              label="Текущий пароль"
              help="Для применения изменений введите Ваш текущий пароль"
              required
            >
              <Input
                name="password"
                type="password"
                value={password}
                onChange={inputPassword}
              />
            </WrapperFormElement>

            <WrapperFormElement>
              <SmartButton
                disabled={!!!password.length}
                onClick={goToChangeData}
              >
                Изменить
              </SmartButton>
            </WrapperFormElement>

          </Form>
        }
      </div>
    </Wrapper>);
};

export default UserConfig;
