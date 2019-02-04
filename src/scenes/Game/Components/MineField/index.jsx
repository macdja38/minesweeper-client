import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gridType from '../../../../props/gridProp';
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
  console.log(tile);
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
  if (isHidden(tile)) {
    return (
      <button
        type="button"
        className={cx(styles.tile, styles.hidden)}
        onClick={e => revealHandler(e, x, y)}
        onContextMenu={e => flagHandler(e, x, y)}
      >
        {getTile(tile)}
      </button>);
  }
  return (
    <div className={cx(styles.tile, styles.revealed)}>
      {getTile(tile)}
    </div>);
}

export default function MineField({ loading, grid, id, width, height, setGame, completed }) {
  const [disabled, setDisabled] = useState(false);

  if (loading) {
    return <p />;
  }

  const clickHandler = (updateMethod, e, x, y) => {
    e.preventDefault();
    if (!completed) {
      updateMethod({ id, x, y })
        .then(game => setGame(game))
        .catch(error => alert(error.message));
    }
  };

  const revealHandler = (e, x, y) => {
    return clickHandler(reveal, e, x, y);
  };

  const flagHandler = (e, x, y) => {
    return clickHandler(flag, e, x, y);
  };


  const field = grid
    .reduce((acc, row, y) => [
      ...acc,
      ...row.map((tile, x) => getTileElement(tile, revealHandler, flagHandler, x, y)),
    ], []);

  return <div className={styles.field}>{field}</div>;
}

MineField.propTypes = {
  grid: gridType,
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  setGame: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

MineField.defaultProps = {
  grid: [],
  id: '',
  width: 0,
  height: 0,
  loading: false,
};
