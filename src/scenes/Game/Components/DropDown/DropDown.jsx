import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

export default function DropDown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className={styles.antiButton}
        onClick={() => setOpen(!open)}
      >
        {label}
      </button>
      {open
        ? (
          <div className={styles.popOverMenu}>
            {children}
          </div>)
        : ''}
    </div>);
}

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
