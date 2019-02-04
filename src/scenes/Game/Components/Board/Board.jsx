import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

export default function Board({ children }) {
  if (children.length !== 2) {
    throw new Error(`Board takes two children, ${children.length} were supplied`);
  }

  const bar = children[0];
  const grid = children[1];

  return (
    <div className={styles.board}>
      <div className={styles.whiteTop} />
      <div className={styles.whiteLeft} />
      <div className={styles.bar}>{bar}</div>
      <div className={styles.grid}>{grid}</div>
    </div>);
}

Board.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
