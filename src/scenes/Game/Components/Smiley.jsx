import React from 'react';
import PropTypes from 'prop-types';

function getSmiley(state) {
  switch (state) {
    case 'S':
      return '🙂';
    case 'L':
      return '😵';
    case 'W':
      return '😎';
    default:
      throw new Error(`Invalid game state '${state}' supplied to smiley`);
  }
}

export default function Smiley({ state }) {
  return <div style={{ fontSize: '200%' }}>{getSmiley(state)}</div>;
}

Smiley.propTypes = {
  state: PropTypes.oneOf(['S', 'L', 'W']).isRequired,
};
