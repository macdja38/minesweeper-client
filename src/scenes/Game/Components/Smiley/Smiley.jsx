import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';
import useReactRouter from 'use-react-router';
import { createGame } from '../../../../services/api/game';

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
  const { history } = useReactRouter();

  const smileyClick = () => {
    createGame().then((game) => {
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
  state: PropTypes.oneOf(['S', 'L', 'W']).isRequired,
};
