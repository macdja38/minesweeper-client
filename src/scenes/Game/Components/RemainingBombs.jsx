import React from 'react';
import PropTypes from 'prop-types';
import gridType from '../../../props/gridProp';
import { isFlagged } from '../../../services/api/grid';
import NSevenSegmentDisplay from './NSevenSegmentDisplay';

export default function RemainingBombs({ grid, totalBombs, loading }) {
  if (loading) {
    return <><p>test</p></>;
  }
  const flaggedTiles = grid
    .reduce((total, row) => total + row
      .reduce((rowTotal, tile) => {
        if (isFlagged(tile)) {
          return rowTotal + 1;
        }
        return rowTotal;
      }, 0), 0);

  const remaining = Math.max(totalBombs - flaggedTiles, 0);

  return (
    <NSevenSegmentDisplay
      value={remaining}
      segments={3}
      onColor="rgba(255,0,0,1)"
      offColor="rgba(255,0,0,0.2)"
      style={{ paddingRight: '10px' }}
    />);
}

RemainingBombs.propTypes = {
  grid: gridType,
  totalBombs: PropTypes.number,
  loading: PropTypes.bool,
};

RemainingBombs.defaultProps = {
  grid: [],
  totalBombs: 0,
  loading: false,
};
