import React, { useState, useEffect } from 'react';
import classes from './AddDb.module.css';

import { useAlert } from '../../components/UI/Alert/AlertContext';
import { usePdf } from '../../hooks/usePdf';

import Wrapper from '../../components/Wrapper';
import Header from '../../components/UI/Header';
import TextBlock from '../../components/UI/TextBlock';
import Alert from '../../components/UI/Alert';
import Space from '../../components/UI/Space';
import Form from '../../components/UI/Form';
import WrapperFormElement from '../../components/UI/WrapperFormElement';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

import TplMap from '../../PDFtpl';

export default function () {
  const [tpl, setTpl] = useState();
  const [file, setFile] = useState();
  const { alertBind, setAlert } = useAlert();
  useEffect(() => setAlert(), []);

  const { addDbByFile } = usePdf();

  const handleChangeFile = (event) => setFile(event.target.files[0]);

  const handleLoadFile = async () => {
    let formData = new FormData();
    formData.append('file', file);
    await addDbByFile({ tpl, formData });
  }

  return (
    <Wrapper>
      <Header>Обновление БД параметров шаблонов</Header>
      <TextBlock>
        Здесь Вы сможете обновить / добавить параметры для шаблонов.
        Для этого выберите шаблон и загрузите файл-таблицу параметров в формате <strong>.CSV (разделитель запятые)</strong>.
        Обратите внимание на необходимые шаблону параметры в таблице, список которых будет доступен после выбора шаблона.
      </TextBlock>
      <Alert {...alertBind} />
      <Space />
      <Form>

        <WrapperFormElement
          label="1. Шаблон"
          help="Выбор шаблона, для которого будет загружена таблица. Доступные параметры шаблона будут выведены ниже."
          width="50%"
        >
          <Select
            value={tpl}
            onChange={(event) => setTpl(event.target.value)}
            title="--- Выбор шаблона"
            options={Object.keys(TplMap).map((value) => ({ title: TplMap[value].config.title, value }))}
            transparent={true}
          />
        </WrapperFormElement> 

        <WrapperFormElement
          label="2. Файл-Таблица .CVS"
          help="Таблица в формате .CVS (разделители запятые). Первая строчка таблицы - заголовок колонок с указанием названий параметров, необходимых шаблону."
          width="50%"
        >
          <Input
            onChange={handleChangeFile}
            name="file"
            type="file"
            accept=".csv"
            center={true} 
            transparent={true}
          />
        </WrapperFormElement>

        <Button
          type="success"
          center={true}
          disabled={!tpl || !file}
          onClick={handleLoadFile}
        >
          Загрузить таблицу в БД
        </Button>

      </Form>

      {tpl && (
        <div>          
          <Space />
          {!!tpl && TplMap[tpl] && TplMap[tpl].tpl({}, 'demo')}
        </div>)
      }
    </Wrapper>);
}
