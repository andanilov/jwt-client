import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Table.module.css'

const Table = ({ data, headers }) =>
  (!!Object.keys(data)?.length || !!headers.length) && (
    <table className={classes.table}>
      {headers.length && (
        <thead>
          <tr>
            {headers.map(({ title, fnClick, sorted }, i) => (
              <th
                scope="col"
                key={i}
                onClick={fnClick ?? (() => {})}
                className={clsx(
                  classes[sorted] ?? '',
                  { [classes.btn]: !!fnClick },
                )}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      {!!Object.keys(data).length && (
        <tbody>
          {Object.entries(data).map(([trId, tr], key) => (
            <tr key={trId}>
              {tr.map((td, tdI) => (
                <td
                  key={tdI}
                  className={headers[tdI]?.align ? classes[headers[tdI]?.align] : ''}>{td}</td>
              ))}
            </tr>
          ))}
        </tbody>)}
    </table>
  );

Table.propTypes = {
  data: PropTypes.instanceOf(Object),
  headers: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  data: {},
  headers: [],
};

export default Table;
