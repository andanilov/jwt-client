import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '.';

const LCntxt = React.createContext();

export const useLoading = () => useContext(LCntxt);

export default function LoadingContext({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <LCntxt.Provider value={{
      setLoading: () => setVisible(true),
      unsetLoading: () => setVisible(false),
    }}>
      {children}
      {visible && <Loading overlay={true} />}
    </LCntxt.Provider>
  );
}

LoadingContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

LoadingContext.defaultProps = {
  children: '',
};

