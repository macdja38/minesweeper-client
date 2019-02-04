import React from 'react';
import PropTypes from 'prop-types';

export default function Progress({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </div>);
}

Progress.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Progress.defaultProps = {
  children: [],
};
