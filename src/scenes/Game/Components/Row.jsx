import React from 'react';
import PropTypes from 'prop-types';

export default function Row({ spread, children }) {
  let style = {
    display: 'flex',
    alignItems: 'center',
  };

  if (spread) {
    style.justifyContent = 'space-between';
  }

  return (
    <div
      style={style}
    >
      {children}
    </div>);
}

Row.propTypes = {
  spread: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

Row.defaultProps = {
  spread: false,
  children: [],
};
