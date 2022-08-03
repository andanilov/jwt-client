import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireAuth = ({ access, children }) => {
  const user = useSelector((state) => state.user.user);

  return (user.isactivated && user.access >= access)
    ? <>{children}</>
    : <Navigate replace to="/" />;
};

RequireAuth.propTypes = {
  access: PropTypes.number,
};

RequireAuth.defaultProps = {
  access: 0,
};


export default RequireAuth;
