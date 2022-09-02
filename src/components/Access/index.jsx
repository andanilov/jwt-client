import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { Navigate, useLocation,  } from 'react-router';

const Access = ({ children, rank, redirect }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  const allowedContent = useCallback((access) => {    
    if (access === undefined) {
      return false;
    } else if ({}.toString.call(rank) === '[object Function]') {
      return rank(access);
    }
    return access >= rank;    
  }, [user]);

  return !!user && (
      <>
        {!!allowedContent(user?.access)
          ? children
          : !!redirect && redirect !== location.pathname && <Navigate to={redirect} />
        }
      </>);
}

Access.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Access.defaultProps = {
  rank: 1,
  redirect: '/',
};

export default Access;
