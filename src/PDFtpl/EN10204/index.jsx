import React from "react";
import classes from './EN10204.module.css';

export const configEN10204 = {
  title: 'Шаблон EN10204',
  id: 'code',
  cols: [
    // disabled
    'code',
    'description',
    'material',
    'pn',
    'd',
    'sdr',
    // enabled
    'customer',
    'batch',
    'date',
    'lot',
    'density',
    'mfr',
    'torque',
  ],
};

// mode = demo | redact
export default function (cols, mode) {
  cols = mode !== 'demo' ? cols : configEN10204.cols.reduce((cls, col) => ({ ...cls, [col]: col }), {})
  return (
    <div className={mode ? classes[mode] : ''}>
      <div className={classes.page}>

        <div className={classes.header}>
          <h1>Паспорт изделия</h1>
          <h2>в соответствии с EN 10204 – 3.1.</h2>
        </div>

        <div className={classes.options}>
          <div>
            <div className={classes.title}>Производитель:</div>
            <div className={classes.body}>Компания Georg Fischer Piping Systems Ltd. (Швейцария)</div>
          </div>
          <div>
            <div className={classes.title}>Адрес:</div>
            <div className={classes.body}>Switzerland CH-8201 Ebnatstrasse, 101</div>
          </div>
        </div>

        <div className={classes.options}>
          <div>
            <div className={classes.title}>Покупатель:</div>
            <div className={classes.bodyCol}>
              {mode === 'demo' ? cols?.customer : (<input id="customer" defaultValue={cols?.customer || ''} />)}            
            </div>
          </div>
          </div>

        <div className={classes.col2}>
          <div className={classes.options}>
            <div>      
              <div className={classes.title}>Код (артикул):</div>
              <div className={classes.bodyId}>{cols.code}</div>
            </div>
            <div>      
              <div className={classes.title}>Наименование:</div>
              <div className={classes.bodyCol}>{cols?.description || ''}</div>
            </div>
            <div>      
              <div className={classes.title}>Материал:</div>
              <div className={classes.bodyCol}>{cols?.material || ''}</div>
            </div>
            <div>      
              <div className={classes.title}>Давление вода / газ:</div>
              <div className={classes.bodyCol}>{cols?.pn || ''}</div>
            </div>
            <div>      
              <div className={classes.title}>№ партии:</div>
              <div className={classes.bodyCol}>
              {mode === 'demo' ? cols?.batch : (<input id="batch" defaultValue={cols?.batch || ''} />)}
              </div>
            </div>
          </div>

          <div className={classes.options}>
              <div>      
                <div className={classes.title}>Дата выпуска:</div>
                <div className={classes.bodyCol}>
                  {mode === 'demo' ? cols?.date : (<input id="date" defaultValue={cols?.date || ''} />)}
                </div>
              </div>
              <div>      
                <div className={classes.title}></div>
                <div className={classes.body}></div>
              </div>
              <div>      
                <div className={classes.title}>Диаметр:</div>
                <div className={classes.bodyCol}>{cols?.d || ''}</div>
              </div>
              <div>      
                <div className={classes.title}>SDR:</div>
                <div className={classes.bodyCol}>{cols?.sdr || ''}</div>
              </div>
              <div>      
                <div className={classes.title}>Количество:</div>
                <div className={classes.bodyCol}>
                  {mode === 'demo' ? cols?.lot : (<input id="lot" defaultValue={cols?.lot || ''} />)}
                </div>
              </div>
          </div>
        </div>

        <div className={classes.info}>
          Мы заверяем , что вышеуказанный товар соответствует следующим требованиям:
        </div>

        <div className={classes.table}>
          <table>        
            <thead>
              <tr>
                <th>№</th>
                <th>Вид испытания</th>
                <th>Стандарт</th>
                <th>Условия</th>
                <th>Единица измерения</th>
                <th>Нормы</th>
                <th>Результат</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Плотность</td>
                <td>ISO 1183</td>
                <td> </td>
                <td>кг/м3</td>
                <td>> 930</td>
                <td className={classes.bodyCol}>
                  {mode === 'demo' ? cols?.density : (<input id="dencity" defaultValue={cols?.density || ''} />)}
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Показатель текучести расплава</td>
                <td>ISO 1133</td>
                <td>190 °C / 5 кг</td>
                <td>гр./10 мин</td>
                <td>EN 1555 / EN 12201 0.2 ... 1.3</td>
                <td className={classes.bodyCol}>
                  {mode === 'demo' ? cols?.mfr : (<input id="mfr" defaultValue={cols?.mfr || ''} />)}
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Период индукции окисления</td>
                <td>EN 728</td>
                <td>200 °С</td>
                <td>мин.</td>
                <td>EN 1555 / EN 12201</td>
                <td>> 20</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Геометрические размеры</td>
                <td>Спецификации GF </td>
                <td>Спецификации GF </td>
                <td>мм</td>
                <td>EN 1555 / EN 12201</td>
                <td>в допуске</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Внешний вид, цвет</td>
                <td>Спецификации GF </td>
                <td>Спецификации GF </td>
                <td> </td>
                <td>EN 1555 / EN 12201</td>
                <td>в допуске</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Гидростатическая прочность </td>
                <td>EN 1167</td>
                <td>80 °C / 5,5 МПа</td>
                <td>ч</td>
                <td>EN 1555 / EN 12201 > 165</td>
                <td className={classes.bodyCol}>
                  {mode === 'demo' ? cols?.torque : (<input id="torque" defaultValue={cols?.torque || ''} />)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={classes.info}>      
          <div className={classes.title}>Условия хранения:</div>
          <div className={classes.body}></div>
        </div>

        <div className={classes.info}>
          Электросварные фитинги и фитинги без закладных элементов, производства компании Georg Fischer упакованы в пластиковый пакет и картонную коробку. При условии, что фитинги хранятся в оригинальной упаковке, защищенной от прямых солнечных лучей и при температуре ниже 40 0С, срок хранения может достигать 10 лет. Срок хранения фитингов начинается с даты производства. Температура хранения фитингов ниже 0 0С допускается.
        </div>

        <div className={classes.info}>
          На вышеуказанную продукцию предоставляется гарантия сроком 12 (двенадцать) месяцев с даты получения продукции конечным пользователем, но максимально сроком восемнадцать (18) месяцев с даты отгрузки продукции компанией Georg Fischer.
        </div>

        <div className={classes.info}>
          Выше перечисленная продукция предназначена для соединения в соответствии с ГОСТ Р 58121.3-2018.
        </div>
        
        <div className={classes.footer}>
          <div>
            Georg Fischer Piping Systems Ltd.<br/>
            Константин Старобинский<br/>
            Управляющий Представительством
          </div>

          <div>

          </div>
        </div>
      </div>
    </div>);
}
