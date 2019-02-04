import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';

import styles from './index.module.css';
import { createGame } from '../../../../services/api/game';

function getSmiley(state) {
  switch (state) {
    case 'C':
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

export default function Smiley({ state, nextGameDimensions: { width, height } }) {
  const { history } = useReactRouter();

  const smileyClick = () => {
    createGame({ width, height }).then((game) => {
      history.push(`/game/${game.id}`);
    });
  };

  return (
    <button
      type="button"
      onClick={smileyClick}
      className={styles.smileyButton}
    >
      {getSmiley(state)}
    </button>);
}

Smiley.propTypes = {
  state: PropTypes.oneOf(['C', 'S', 'L', 'W']).isRequired,
  nextGameDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

Smiley.defaultProps = {
  nextGameDimensions: {
    width: 8,
    height: 8,
  },
};
