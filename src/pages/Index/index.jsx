import React from 'react';
import { useSelector } from 'react-redux';
import config from '../../conf';
import Wrapper from '../../components/Wrapper';

import Access from '../../components/Access';
import Alert from '../../components/UI/Alert';
import Header from '../../components/UI/Header';

export default function() {
  const user = useSelector((state) => state.user.user);

  return (
    <Wrapper>
      <Header>Добро пожаловать в {config.SERVICE_NAME} !</Header>

      <Access rank={(access) => access < 1}>
        <Alert>
          Благодарим за регистрацию в сервисе {config.SERVICE_NAME} !
          В ближайшее время Администратор подтвердит ваши права.<br/>
          Также, вы можете обратиться к администратору по <a href={`mailto:${config.ADMIN_EMAIL}`} title="Написать администратору">почте</a>.      
        </Alert>
      </Access>

      {!!user?.email && !user?.isactivated && (
        <Alert type="error">
          Вам необходимо подтвердить свой Email. Письмо с инструкциями выслано на адрес: {user?.email}       
        </Alert>)
      }

    </Wrapper>);
}
