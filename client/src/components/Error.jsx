// Error.jsx
import React from 'react';

const Error = ({ message }) => {
  if (!message) {
    return null;
  }
  if (typeof message === 'object') {
    return "[Invalid type] Error Object Provided";
  }
  return (
    <div className="form-floating text-center m-3">
      <h5 className="text-danger">
        {message}
      </h5>
    </div>
  );
};

export default Error;
