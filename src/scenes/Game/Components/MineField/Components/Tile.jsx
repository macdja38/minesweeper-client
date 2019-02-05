import React from 'react';
import PropTypes from 'prop-types';
import {
  extractAdjacent,
  isBomb,
  isFlagged,
  isHidden,
} from '../../../../../services/api/grid';
import styles from '../index.module.css';

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

function getColour(tile) {
  const symbol = getTile(tile);
  switch (symbol) {
    case '8':
      return 'darkgray';
    case '7':
      return '#000000';
    case '6':
      return '#008080';
    case '5':
      return '#800000';
    case '4':
      return '#000080';
    case '3':
      return '#ff0000';
    case '2':
      return '#008000';
    case '1':
      return '#0000ff';
    default:
      return '#000000';
  }
}

export default function Tile({
  tile,
  revealHandler,
  flagHandler,
  x,
  y,
}) {
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
    <div
      style={{
        color: getColour(tile),
        fontWeight: 'bold',
      }}
      className={cx(styles.tile, styles.revealed)}
    >
      {getTile(tile)}
    </div>);
}

Tile.propTypes = {
  tile: PropTypes.number.isRequired,
  revealHandler: PropTypes.func,
  flagHandler: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
};

Tile.defaultProps = {
  revealHandler: () => {
  },
  flagHandler: () => {
  },
  x: 0,
  y: 0,
};
