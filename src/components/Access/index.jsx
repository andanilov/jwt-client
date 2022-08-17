import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Access = ({ children, rank }) => {
  const user = useSelector((state) => state.user.user);

  const allowedContent = (access) => {    
    // rank === 1 && console.log(rank, access);
    if (access === undefined) {
      return false;
    } else if ({}.toString.call(rank) === '[object Function]') {
      return rank(access);
    } else {
      return access >= rank;
    }
  }

  return <>{!!allowedContent(user?.access) && children}</>;
}

Access.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
};

Access.defaultProps = {
  rank: 1,
};

export default Access;
