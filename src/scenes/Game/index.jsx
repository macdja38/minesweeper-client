import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import Smiley from './Components/Smiley/Smiley';
import Row from './Components/Row';
import RemainingBombs from './Components/RemainingBombs';
import Timer from './Components/Timer';
import MineField from './Components/MineField/index';
import DropDown from './Components/DropDown/DropDown';
import Board from './Components/Board/Board';
import Option from './Components/Option';
import { getGame } from '../../services/api/game';

import styles from './index.module.css';

export default function GameScene() {
  const [game, setGame] = useState({ game_state: 'S' });
  const [loading, setLoading] = useState(true);
  const { match } = useReactRouter();
  const completed = game.game_state !== 'S';

  useEffect(() => {
    const update = () => {
      getGame(match.params.id).then((fetchedGame) => {
        setGame(fetchedGame);
        setLoading(false);
      });
    };
    update();

    const timer = setInterval(update, 1000);

    return () => clearTimeout(timer);
  }, [match.params.id]);

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
