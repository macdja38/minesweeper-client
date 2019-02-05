/* globals alert */

import React from 'react';
import PropTypes from 'prop-types';
import { gridType } from '../../../../props/gridProp';
import styles from './index.module.css';
import Tile from './Components/Tile';
import { reveal, flag } from '../../../../services/api/game';

export default function MineField({
  loading,
  grid,
  id,
  width,
  height,
  setGame,
  completed,
}) {
  let tileGrid;
  if (loading) {
    tileGrid = new Array(height)
      .fill(0)
      .map((value, y) => new Array(width)
        .fill(128)
        // in this case array indexes are fine when combined with tile value
        // as so long as tile value and tile location stay the same
        // tiles can be interchanged freely
        // eslint-disable-next-line react/no-array-index-key
        .map((tile, x) => <Tile key={`${tile}-${x}-${y}`} tile={tile} x={x} y={y} />));
  } else {
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

    tileGrid = grid
      .reduce((acc, row, y) => [
        ...acc,
        ...row.map((tile, x) => (
          // in this case array indexes are fine when combined with tile value
          // as so long as tile value and tile location stay the same
          // tiles can be interchanged freely
          // eslint-disable-next-line react/no-array-index-key
          <Tile key={`${tile}-${x}-${y}`} tile={tile} revealHandler={revealHandler} flagHandler={flagHandler} x={x} y={y} />)),
      ], []);
  }

  return (
    <div
      className={styles.field}
      style={{
        gridTemplateRows: `repeat(${height}, 1fr)`,
        gridTemplateColumns: `repeat(${width}, 1fr)`,
      }}
    >
      {tileGrid}
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
