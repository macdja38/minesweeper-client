import React from 'react';
import PropTypes from 'prop-types';

export default function Option({ children }) {
  return <div>{children}</div>;
}

Option.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
