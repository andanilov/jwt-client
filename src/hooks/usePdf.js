import { useDispatch, useSelector } from 'react-redux';
import PdfService from '../services/PdfService';

import { useLoading } from '../components/UI/Loading/LoadingContext';
import { useAlert } from '../components/UI/Alert/AlertContext';

import { jsPDF } from 'jspdf';
import { PTSansNormal } from '../fonts/PTSansNormal';
import { PTSansBold } from '../fonts/PTSansBold';

export function usePdf() {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user.user);
  const { setLoading, unsetLoading } = useLoading();
  const { setAlert } = useAlert();

  const addDbByFile = async ({ tpl, formData }) => {
    try {
      formData.append('document', JSON.stringify({ tpl, email }));

      const response = await PdfService.addDbFile(formData);
      setAlert(response.data?.success, 'success');
    } catch(e) {
      setAlert(`Загрузка файла не удалась: ${e.response?.data?.error}`, 'error');
    }
  };

  const getProductByCode = async (code) => {
    try {
      setLoading();
      const response = await PdfService.getProductByCode(code);

      setAlert(response.data?.success, 'success');
      return response.data?.product;
    } catch (e) {      
      setAlert(`Во время поиска произошла ошибка: ${e.response?.data?.error}`, 'error');
    } finally {
      unsetLoading();
    }
  };

  const pfdByHTML = (html) => {
    if (!html) {
      return;
    }

    const doc = new jsPDF({ unit: 'mm', putOnlyUsedFonts: true });
    
    // Add Russian fonts
    doc.addFileToVFS('PTSansNormal.ttf', PTSansNormal);
    doc.addFileToVFS('PTSansBold.ttf', PTSansBold);
    doc.addFont('PTSansNormal.ttf', 'PTSansNormal', 'normal')
    doc.addFont('PTSansBold.ttf', 'PTSansBold', 'normal')

    doc.html(html, {
      callback: function (doc) {
        doc.output('dataurlnewwindow');
      }
    });
  };

  const _changeInputToSpan = (dom) =>
    dom.querySelectorAll('input').forEach((el) =>
      el.parentNode.innerHTML = `<span id="${el.id}">${el.value}</span>`);

  const _changeSpanToInput = (dom) =>
    dom.querySelectorAll('span[id]').forEach((el) =>
      el.parentNode.innerHTML = `<input id="${el.id}" value="${el.innerHTML}" />`);

  const generatePdfByDom = (tplDom) => {
    setLoading();
    
    // 1. Change inputs to values  
    _changeInputToSpan(tplDom);  

    // 2. Delete redact mode before PDF print
    const tplInside = tplDom.querySelector('div');
    const tplInsideClassName = tplInside.className;
    tplInside.className = '';

    // Generate PDF
    pfdByHTML(tplDom);

    // Return tpl redact view with deley for send html to jsPDF
    setTimeout(() => {
      _changeSpanToInput(tplDom);
      tplInside.className = tplInsideClassName;
      unsetLoading();
    }, 500);
  }

  return { addDbByFile, getProductByCode, pfdByHTML, generatePdfByDom };
}
