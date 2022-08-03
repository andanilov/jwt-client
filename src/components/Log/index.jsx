import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../UI/Alert';
import classes from './Log.module.css'

const Log = ({ errors, messages }) => (
  <div className={classes.area}>
    {!!errors.length &&
      <Alert type="error">
        {errors.join('<br>')}
      </Alert>}
    {!!messages.length &&
      <Alert type="success">
        {messages.join('<br>')}
      </Alert>}
  </div>
);

Log.propTypes = {
  errors: PropTypes.instanceOf(Array),
  messages: PropTypes.instanceOf(Array),
};

Log.defaultProps = {
  errors: [],
  messages: [],
};

export default Log;
