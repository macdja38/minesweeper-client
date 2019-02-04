import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import Smiley from './Components/Smiley/Smiley';
import Row from './Components/Row';
import RemainingBombs from './Components/RemainingBombs';
import Timer from './Components/Timer';
import MineField from './Components/MineField/index';
import DropDown from './Components/DropDown/DropDown';
import Board from './Components/Board/Board';
import { getGame } from '../../services/api/game';

import styles from './index.module.css';

function Menu({ children }) {
  return <div>{children}</div>;
}

function Option({ children }) {
  return <div>{children}</div>;
}

export default function GameScene() {
  const [game, setGame] = useState({ game_state: 'S' });
  const [loading, setLoading] = useState(true);
  const { match } = useReactRouter();
  const completed = game.game_state !== 'S';

  useEffect(() => {
    getGame(match.params.id).then((fetchedGame) => {
      setGame(fetchedGame);
      setLoading(false);
    });
  }, [match.params.id]);

  console.log(game);

  return (
    <div className={styles.window}>
      <Row>
        <DropDown label="Game">
          <Option>New</Option>
          <br />
          <Option>Beginner</Option>
          <Option>Intermediate</Option>
          <Option>Expert</Option>
          <br />
          <Option>Exit</Option>
        </DropDown>
        <DropDown label="Help">
          <Option>Instructions</Option>
        </DropDown>
      </Row>
      <Board>
        <Row spread>
          <RemainingBombs grid={game.client_state} totalBombs={game.bombs} loading={loading} />
          <Smiley state={game.game_state} loading={loading} />
          <Timer
            startTime={game.start_time}
            endTime={game.end_time}
            completed={completed}
            loading={loading}
          />
        </Row>
        <MineField
          id={game.id}
          grid={game.client_state}
          setGame={setGame}
          completed={completed}
          loading={loading}
        />
      </Board>
    </div>);
}
