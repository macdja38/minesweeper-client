import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

export default function Option({ children, onSelect }) {
  return <button type="button" className={styles.mouseOverOption} onClick={onSelect}>{children}</button>;
}

Option.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onSelect: PropTypes.func,
};

Option.defaultProps = {
  onSelect: () => {},
};
