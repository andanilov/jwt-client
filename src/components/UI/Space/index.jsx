import React from 'react';
import PropTypes from 'prop-types';


export default function Space({ sizeEm }) {
  return (
    <div style={{height: sizeEm + 'em'}}> </div>
  );
}

Space.propTypes = {
  size: PropTypes.number,
};

Space.defaultProps = {
  sizeEm: 2
};
