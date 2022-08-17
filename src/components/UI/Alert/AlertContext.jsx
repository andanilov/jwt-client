import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ACntxt = React.createContext();

export const useAlert = () => useContext(ACntxt);

export default function AlertContext({ children }) {
  const [msg, setMsg] = useState();
  const [type, setType] = useState();  

  const alrtObj = {
    alertBind: { children: msg, type },
    setAlert(msg, type) {
      setMsg(msg);
      type && setType(type);
    },
  };

  return (
    <ACntxt.Provider value={alrtObj}>
      {children}
    </ACntxt.Provider>);
}

AlertContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

AlertContext.defaultProps = {
  children: '',
};
