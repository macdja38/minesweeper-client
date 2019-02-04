import React, { useState } from 'react';
import { tile as tileStyle, field as fieldStyle } from './index.module.css';
import { extractAdjacent, isBomb, isFlagged, isHidden } from '../../../../services/api/grid';
import { reveal, flag } from '../../../../services/api/game';


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
  return extractAdjacent(tile).toString();
}

function getTileElement(tile, revealHandler, flagHandler, x, y) {
  if (isHidden(tile)) {
    return (
      <button
        type="button"
        className={tileStyle}
        onClick={e => revealHandler(e, x, y)}
        onContextMenu={e => flagHandler(e, x, y)}
      >
        {getTile(tile)}
      </button>);
  }
  return (
    <div className={tileStyle}>
      {getTile(tile)}
    </div>);
}

export default function MineField({ loading, grid, id, width, height, setGame }) {
  const [disabled, setDisabled] = useState(false);

  if (loading) {
    return <p />;
  }

  const revealHandler = (e, x, y) => {
    reveal({ id, x, y }).then(game => setGame(game));
  };

  const flagHandler = (e, x, y) => {
    e.preventDefault();
    flag({ id, x, y }).then(game => setGame(game));
  };

  const field = grid
    .reduce((acc, row, y) => [
      ...acc,
      ...row.map((tile, x) => getTileElement(tile, revealHandler, flagHandler, x, y)),
    ], []);

  return <div className={fieldStyle}>{field}</div>;
}
