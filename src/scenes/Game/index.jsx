import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import Smiley from './Components/Smiley';
import Progress from './Components/Progress';
import RemainingBombs from './Components/RemainingBombs';
import Timer from './Components/Timer';
import MineField from './Components/MineField/index';
import { getGame } from '../../services/api/game';


function Menu({ children }) {
  return <div>{children}</div>;
}

function DropDown({ children }) {
  return <div>{children}</div>;
}

function Option({ children }) {
  return <div>{children}</div>;
}

function Board({ children }) {
  return <div style={{ height: '100%' }}>{children}</div>;
}

export default function GameScene() {
  const [game, setGame] = useState({ game_state: 'S' });
  const [loading, setLoading] = useState(true);
  const { match } = useReactRouter();

  useEffect(() => {
    getGame(match.params.id).then((fetchedGame) => {
      setGame(fetchedGame);
      setLoading(false);
    });
  }, [match.params.id]);

  console.log(game);

  return (
    <div style={{ display: 'grid', height: '100%', width: '100%' }}>
      <Menu>
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
        <Board>
          <Progress>
            <RemainingBombs grid={game.client_state} totalBombs={game.bombs} loading={loading} />
            <Smiley state={game.game_state} loading={loading} />
            <Timer startTime={game.start_time} loading={loading} />
          </Progress>
          <MineField id={game.id} grid={game.client_state} setGame={setGame} loading={loading} />
        </Board>
      </Menu>
    </div>);
}
