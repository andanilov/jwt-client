import React, { useEffect, useState, useMemo, useRef } from 'react';
import classes from './Pdf.module.css';

import { useUiInput } from '../../hooks/useUiInput';
import { usePdf } from '../../hooks/usePdf';
import { useAlert } from '../../components/UI/Alert/AlertContext';

import Wrapper from '../../components/Wrapper';
import Header from '../../components/UI/Header';
import Alert from '../../components/UI/Alert';
import WrapperFormElement from '../../components/UI/WrapperFormElement';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

import TplMap from '../../PDFtpl';

export default function() {  
  const [product, setProduct] = useState({});
  const tplDom = useRef();
  const code = useUiInput({ stopContent: /\W/g });
  const { getProductByCode, generatePdfByDom } = usePdf();

  const { alertBind, setAlert } = useAlert();
  useEffect(() => setAlert(), []);

  const toSearch = () => code.value
    && getProductByCode(code.value).then((prdct) => setProduct(prdct));

  const tplCols = useMemo(() => product?.tpl &&
    TplMap[product.tpl]?.config?.cols.reduce((cls, col) =>
      ({ ...cls, [col]: product[col] ?? ''}), [product]));

  return (
    <Wrapper>
      <Header>PDF по коду продукта</Header>
      <Alert {...alertBind} />
      <Header size={2} align="left">1. Введите код продукта</Header>
      <WrapperFormElement help='Введите код и нажмите Enter. Система подберёт нужный шаблон и подставит в него параметры продукта.'>
          <Input
            placeholder="код"
            onChange={code.onChange}
            value={code.name}
            transparent={true}
            focus
            toEnter={toSearch}
            style={{fontSize: '1.5em'}}
          />
      </WrapperFormElement>
      
      {!!product?.tpl && !!tplCols && (
        <>
          <Header size={2} align="left">2. Проверьте параметры шаблона, отредактируйте если потребуется</Header>
         
          <div ref={tplDom} className={classes.tpl}>
            {TplMap[product.tpl].tpl(tplCols, 'redact')}
          </div>          

          <Header size={2} align="left">3. Создайте PDF сертификат</Header>
          <div>
            <Button 
              type="success"
              center={true}
              onClick={() => generatePdfByDom(tplDom.current)}
            >
              Создать PDF
            </Button>
          </div>
        </>)
      }
    </Wrapper>);
}
