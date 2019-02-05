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

function getTileInfo(tile, completed) {
  const flagged = isFlagged(tile);
  const hidden = isHidden(tile);
  const bomb = isBomb(tile);

  if (flagged && (!completed || bomb)) {
    return {
      symbol: '🚩',
      button: true,
    };
  }
  if (hidden && flagged && !bomb && completed) {
    return {
      symbol: '❌',
      button: false,
    };
  }
  if (!flagged && bomb && completed) {
    return {
      symbol: '💣',
      button: false,
    };
  }
  if (hidden) {
    return {
      symbol: ' ',
      button: true,
    };
  }
  if (bomb) {
    return {
      symbol: '💣',
      button: false,
    };
  }
  const labelNumber = extractAdjacent(tile);
  if (labelNumber > 0) {
    return {
      symbol: labelNumber.toString(),
      button: false,
      number: true,
    };
  }
  return {
    symbol: ' ',
    button: false,
  };
}

function getColour(symbol) {
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
  completed,
  x,
  y,
}) {
  const meta = getTileInfo(tile, completed);

  if (meta.button) {
    return (
      <button
        type="button"
        className={cx(styles.tile, styles.hidden)}
        onClick={e => revealHandler(e, x, y)}
        onContextMenu={e => flagHandler(e, x, y)}
      >
        {meta.symbol}
      </button>);
  }
  const style = {
    fontWeight: 'bold',
  };
  if (meta.number) {
    style.color = getColour(meta.symbol);
  }
  return (
    <div
      style={style}
      className={cx(styles.tile, styles.revealed)}
    >
      {meta.symbol}
    </div>);
}

Tile.propTypes = {
  tile: PropTypes.number.isRequired,
  revealHandler: PropTypes.func,
  flagHandler: PropTypes.func,
  completed: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};

Tile.defaultProps = {
  revealHandler: () => {
  },
  flagHandler: () => {
  },
  completed: false,
  x: 0,
  y: 0,
};
