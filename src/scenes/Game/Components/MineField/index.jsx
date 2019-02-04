/* globals alert */

import React from 'react';
import PropTypes from 'prop-types';
import { gridType } from '../../../../props/gridProp';
import styles from './index.module.css';
import {
  extractAdjacent,
  isBomb,
  isFlagged,
  isHidden,
} from '../../../../services/api/grid';
import { reveal, flag } from '../../../../services/api/game';

function cx(...args) {
  return args.join(' ');
}

function getTile(tile) {
  if (isFlagged(tile)) {
    return '🚩';
  }
  if (isHidden(tile)) {
    return ' ';
  }
  if (isBomb(tile)) {
    return '💣';
  }
  const labelNumber = extractAdjacent(tile);
  if (labelNumber > 0) {
    return labelNumber.toString();
  }
  return '';
}

function getTileElement(tile, revealHandler, flagHandler, x, y) {
  const key = `${tile}-${x}-${y}`;

  if (isHidden(tile)) {
    return (
      <button
        key={key}
        type="button"
        className={cx(styles.tile, styles.hidden)}
        onClick={e => revealHandler(e, x, y)}
        onContextMenu={e => flagHandler(e, x, y)}
      >
        {getTile(tile)}
      </button>);
  }
  return (
    <div key={key} className={cx(styles.tile, styles.revealed)}>
      {getTile(tile)}
    </div>);
}

export default function MineField({
  loading,
  grid,
  id,
  width,
  height,
  setGame,
  completed,
}) {
  if (loading) {
    return (
      <div className={styles.field}>
        {new Array(height)
          .fill(0)
          .map((value, y) => new Array(width)
            .fill(128)
            .map((tile, x) => getTileElement(tile, () => {}, () => {}, x, y)))}
      </div>);
  }
  const clickHandler = (updateMethod, e, x, y) => {
    e.preventDefault();
    if (!completed) {
      updateMethod({ id, x, y })
        .then(game => setGame(game))
        .catch(error => alert(error.message));
    }
  };

  const revealHandler = (e, x, y) => clickHandler(reveal, e, x, y);

  const flagHandler = (e, x, y) => clickHandler(flag, e, x, y);

  const field = grid
    .reduce((acc, row, y) => [
      ...acc,
      ...row.map((tile, x) => getTileElement(tile, revealHandler, flagHandler, x, y)),
    ], []);

  return (
    <div
      className={styles.field}
      style={{
        gridTemplateRows: `repeat(${height}, 1fr)`,
        gridTemplateColumns: `repeat(${width}, 1fr)`,
      }}
    >
      {field}
    </div>);
}

MineField.propTypes = {
  grid: gridType,
  id: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  setGame: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  completed: PropTypes.bool,
};

MineField.defaultProps = {
  grid: [],
  id: 0,
  width: 8,
  height: 8,
  loading: false,
  completed: false,
};
